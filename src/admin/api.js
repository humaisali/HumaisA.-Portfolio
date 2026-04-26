const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

function getToken() {
  return localStorage.getItem("admin_token");
}

async function request(method, path, body = null) {
  const headers = { "Content-Type": "application/json" };
  const token = getToken();
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : null,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.message || "Request failed");
  return data;
}

export const api = {
  // Auth
  login:          (body) => request("POST", "/auth/login", body),
  verify:         ()     => request("GET",  "/auth/verify"),

  // Stats
  getStats:       ()     => request("GET",  "/stats"),

  // Personal Info
  getPersonal:    ()     => request("GET",  "/personal"),
  updatePersonal: (body) => request("PUT",  "/personal", body),
  seedPersonal:   ()     => request("POST", "/personal/seed"),

  // Skills
  getSkills:      ()     => request("GET",    "/skills"),
  createSkill:    (body) => request("POST",   "/skills", body),
  updateSkill:    (id, body) => request("PUT",    `/skills/${id}`, body),
  deleteSkill:    (id)   => request("DELETE", `/skills/${id}`),
  seedSkills:     ()     => request("POST",   "/skills/seed"),

  // Experience
  getExperience:      ()     => request("GET",    "/experience"),
  createExperience:   (body) => request("POST",   "/experience", body),
  updateExperience:   (id, body) => request("PUT",    `/experience/${id}`, body),
  deleteExperience:   (id)   => request("DELETE", `/experience/${id}`),
  seedExperience:     ()     => request("POST",   "/experience/seed"),

  // Projects
  getProjects:    ()     => request("GET",    "/projects"),
  createProject:  (body) => request("POST",   "/projects", body),
  updateProject:  (id, body) => request("PUT",    `/projects/${id}`, body),
  deleteProject:  (id)   => request("DELETE", `/projects/${id}`),
  seedProjects:   ()     => request("POST",   "/projects/seed"),

  // Messages
  getMessages:    ()   => request("GET",    "/messages"),
  markRead:       (id) => request("PATCH",  `/messages/${id}/read`),
  markReplied:    (id) => request("PATCH",  `/messages/${id}/replied`),
  deleteMessage:  (id) => request("DELETE", `/messages/${id}`),
  getMessageStats: ()  => request("GET",    "/messages/stats"),
};
