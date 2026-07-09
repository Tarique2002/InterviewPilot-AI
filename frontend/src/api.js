import axios from "axios";

const API = import.meta.env.VITE_API_URL || 
  (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") 
    ? "http://127.0.0.1:8000" 
    : "https://interviewpilot-api.onrender.com");

// Set up persistent Session-ID for the client
let sessionId = typeof window !== "undefined" ? localStorage.getItem("interview_session_id") : null;
if (typeof window !== "undefined" && !sessionId) {
  sessionId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  localStorage.setItem("interview_session_id", sessionId);
}

if (sessionId) {
  axios.defaults.headers.common["X-Session-ID"] = sessionId;
}

export default API;