
export const SESSION_KEY = "ticketapp_session";
export const USERS_KEY = "ticketapp_users";

export function getSession() {
  try {
    const session = localStorage.getItem(SESSION_KEY);
    return session ? JSON.parse(session) : null;
  } catch (error) {
    console.error("Error reading session:", error);
    return null;
  }
}

export function setSession(token) {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(token));
  } catch (error) {
    console.error("Error saving session:", error);
  }
}

export function clearSession() {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch (error) {
    console.error("Error clearing session:", error);
  }
}

export function getUsers() {
  try {
    const users = localStorage.getItem(USERS_KEY);
    return users ? JSON.parse(users) : [];
  } catch (error) {
    console.error("Error fetching users:", error);
    return [];
  }
}

export function saveUsers(user) {
  try {
    const users = getUsers();
    users.push(user);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error("Error saving user:", error);
  }
}
