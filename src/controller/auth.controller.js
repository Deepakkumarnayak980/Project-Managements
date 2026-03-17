import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/api-response.js";
import { ApiError } from "../utils/api-errors.js";
import { asyncHandler } from "../utils/async-handler.js";
import { emailVerificationMailgenContent, sendEmail } from "../utils/mail.js";


// Generate Access & Refresh Tokens
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);

    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;

    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token",
    );
  }
};

// Register User
const registerUser = asyncHandler(async (req, res) => {
  const { email, username, password } = req.body;

  // Validate fields
  if (!email || !username || !password) {
    throw new ApiError(400, "Email, Username and Password are required");
  }

  // Trim values
  const cleanEmail = email.trim().toLowerCase();
  const cleanUsername = username.trim().toLowerCase();

  // Check if user exists
  const existingUser = await User.findOne({
    $or: [{ username: cleanUsername }, { email: cleanEmail }],
  });

  if (existingUser) {
    throw new ApiError(409, "User with email or username already exists");
  }

  // Create user
  const user = await User.create({
    email: cleanEmail,
    username: cleanUsername,
    password,
    isEmailVerified: false,
  });

  // Generate email verification token
  const { unHashedToken, hashedToken, tokenExpiry } =
    user.generateTemporaryToken();

  user.emailVerificationToken = hashedToken;
  user.emailVerificationExpiry = tokenExpiry;

  await user.save({ validateBeforeSave: false });

  // Verification URL
  const verificationUrl = `${req.protocol}://${req.get(
    "host",
  )}/api/v1/auth/verify-email/${unHashedToken}`;

  // Send verification email
  await sendEmail({
    email: user.email,
    subject: "Please verify your email",
    mailGenerator: emailVerificationMailgenContent(
      user.username,
      verificationUrl,
    ),
  });

  // Remove sensitive fields
  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry",
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while registering user");
  }

  return res
    .status(201)
    .json(
      new ApiResponse(
        201,
        { user: createdUser },
        "User registered successfully. Verification email sent.",
      ),
    );
});

//Login
const login = asyncHandler(async (req, res) => {

  const { email, password } = req.body;

  // Check email
  if (!email) {
    throw new ApiError(400, "Email is required");
  }

  // Find user
  const user = await User.findOne({ email });

  if (!user) {
    throw new ApiError(400, "User does not exist");
  }

  // Check password
  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid credentials");
  }

  // Generate tokens
  const { accessToken, refreshToken } =
    await generateAccessAndRefreshTokens(user._id);

  // Remove sensitive fields
  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken -emailVerificationToken -emailVerificationExpiry"
  );

  const options = {
    httpOnly: true,
    secure: false, // change to true in production (HTTPS)
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(
      new ApiResponse(
        200,
        {
          user: loggedInUser,
          accessToken,
          refreshToken
        },
        "User logged in successfully"
      )
    );
});

export { registerUser, generateAccessAndRefreshTokens,login };
