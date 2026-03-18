const asyncHandler = (requestHandler) => {
  return (req, res, next) => {
    Promise
      .resolve(requestHandler(req, res, next))
      .catch(next); // directly pass error
  };
};

export { asyncHandler };