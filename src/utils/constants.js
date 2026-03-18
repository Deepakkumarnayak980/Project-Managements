const UserRolesEnum = Object.freeze({
  ADMIN: "admin",
  PROJECT_ADMIN: "project_admin",
  MEMBER: "member",
});

const AvailableUserRoles = Object.values(UserRolesEnum);

const TaskStatusEnum = Object.freeze({
  TODO: "todo",
  IN_PROGRESS: "in_progress",
  DONE: "done",
});

const AvailableTaskStatuses = Object.values(TaskStatusEnum);

export {
  UserRolesEnum,
  AvailableUserRoles,
  TaskStatusEnum,
  AvailableTaskStatuses,
};