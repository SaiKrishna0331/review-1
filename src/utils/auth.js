// Simple auth helper using localStorage for demo purposes
const USERS_KEY = "cm_users";
const SESSION_KEY = "cm_session";

export function loadUsers() {
  try {
    return JSON.parse(localStorage.getItem(USERS_KEY) || "[]");
  } catch {
    return [];
  }
}

export function saveUsers(list) {
  localStorage.setItem(USERS_KEY, JSON.stringify(list));
}

export function registerUser({ name, email, password }) {
  const users = loadUsers();
  if (users.find((u) => u.email === email)) {
    throw new Error("User already exists");
  }
  const user = { id: Date.now().toString(), name, email, password, role: "user" };
  users.push(user);
  saveUsers(users);
  return user;
}

export function loginUser({ email, password }) {
  const users = loadUsers();
  const found = users.find((u) => u.email === email && u.password === password);
  if (!found) return null;
  localStorage.setItem(SESSION_KEY, JSON.stringify({ id: found.id, email: found.email, name: found.name, role: found.role }));
  return found;
}

export function loginAdmin({ email, password }) {
  // Demo admin credential - change for production
  const ADMIN_EMAIL = "admin@conference.local";
  const ADMIN_PASS = "admin123";
  if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
    const adminSession = { id: "admin", email: ADMIN_EMAIL, name: "Administrator", role: "admin" };
    localStorage.setItem(SESSION_KEY, JSON.stringify(adminSession));
    return adminSession;
  }
  return null;
}

export function currentSession() {
  try { return JSON.parse(localStorage.getItem(SESSION_KEY) || "null"); } catch { return null; }
}

export function logout() {
  localStorage.removeItem(SESSION_KEY);
}
