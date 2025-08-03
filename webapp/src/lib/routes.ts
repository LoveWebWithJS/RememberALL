const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce(
    (acc, key) => ({ ...acc, [key]: `:${key}` }),
    {}
  ) as Record<keyof T, string>;
};
// Edit
export const editTaskRouteParams = getRouteParams({ id: true });
export type EditTaskRouteParams = typeof editTaskRouteParams;
export const getEditTaskRoute = ({ id }: EditTaskRouteParams) =>
  `/task/${id}/edit`;
// Get single task
export const getTaskRouteParams = getRouteParams({ id: true });
export type GetTaskRouteParams = typeof getTaskRouteParams;
export const getTaskRoute = ({ id }: GetTaskRouteParams) => `/tasks/${id}`;
// Static paths
export const getDoEverythingPageRoute = () => '/';
export const getSettingsPageRoute = () => '/settings';
export const getAddNewTaskRoute = () => '/add';
export const getSignUpRoute = () => '/sign-up';
export const getSignInRoute = () => '/sign-in';
export const getSignOutRoute = () => '/sign-out';
