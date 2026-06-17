export function saveSession(user) {
  localStorage.setItem(
    "session",
    JSON.stringify({
      user,
      role: user.role || "free",
      expires: Date.now() + 3 * 24 * 60 * 60 * 1000 // 3 days
    })
  );
}

export function getSession() {
  const data = localStorage.getItem("session");

  if (!data) return null;

  const session = JSON.parse(data);

  if (Date.now() > session.expires) {
    localStorage.removeItem("session");
    return null;
  }

  return session;
}