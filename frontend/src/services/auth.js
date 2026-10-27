const USER_KEY = "jira_user";

export const login = (user) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const logout = () => {
  localStorage.removeItem(USER_KEY);
};

export const getUser = () => {
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const getToken = () => {
  const user = getUser();
  return user ? user.token : null;
};

export const isAuthenticated = () => {
  return !!getToken();
};

export const getRole = () => {
  const user = getUser();
  return user?.role || "";
};

export const getUsername = () => {
  const user = getUser();
  return user?.username || "";
};

export const getFullName = () => {
  const user = getUser();
  return user?.fullName || "";
};

export const getDepartment = () => {
  const user = getUser();
  return user?.department || "";
};

export const getDesignation = () => {
  const user = getUser();
  return user?.designation || "";
};

export const getTeam = () => {
  const user = getUser();
  return user?.team || "";
};

export const getProfilePhoto = () => {
  const user = getUser();
  return user?.profilePhoto || "";
};