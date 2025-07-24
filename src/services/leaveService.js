import axios from "axios";
const API_BASE = import.meta.env.VITE_API_URL;
export const getMyLeaves = async (status = "") => {
  const url = status
    ? `/api/leaves/my-applications?status=${status}`
    : "/api/leaves/my-applications";

  const response = await axios.get(url, {
    withCredentials: true, // ✅ This ensures cookies are sent in cross-origin requests
  });

  return response.data;
};

export const getAllStudentLeaves = async () => {
  const res = await axios.get(`${API_BASE}/api/leaves/getAllStudentLeaves`);
  return res.data;
};




export const submitLeave = async (leaveData) => {
  const res = await axios.post(`${API_BASE}/api/leaves`, leaveData, {
    withCredentials: true, // ✅ Send cookies for JWT-based auth
    headers: {
      "Content-Type": "multipart/form-data", // ✅ Required for file uploads
    },
  });
  return res.data;
};

export const actionOnLeave = async ({ selectedAppId, decisionType, comment, decidedAt,role }) => {
  const response = await axios.post(`${API_BASE}/api/leaves/actionOnLeave`, {
  appId: selectedAppId,
  status: decisionType,
  comment,
  decidedAt,
  role,
});
  return response.data;
};
