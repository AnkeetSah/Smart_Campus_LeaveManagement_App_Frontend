// src/services/leaveService.js
import api from "./api"; // centralized axios instance

export const getMyLeaves = async (status = "") => {
  const url = status
    ? `/api/leaves/my-applications?status=${status}`
    : "/api/leaves/my-applications";

  const response = await api.get(url);
  return response.data;
};

export const getLeaveById=async (id)=>{
  const res=await api.get(`/api/leaves/${id}`);
  return res.data
}

export const getAllStudentLeaves = async () => {
  const res = await api.get("/api/leaves/getAllStudentLeaves");
  return res.data;
};

export const submitLeave = async (leaveData) => {
  const res = await api.post("/api/leaves", leaveData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const updateLeave = async (id, leaveData) => {
  const res = await api.put(`/api/leaves/update/${id}`, leaveData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};




export const submitLeaveWithAttachments = async (formData) => {
  const data = new FormData();
  console.log(formData)
  for (let key in formData) {
    if (key === "documents" && formData.documents) {
      formData.documents.forEach((file) => {
        data.append("documents", file);
      });
    } else {
      data.append(key, formData[key]);
    }
  }
  console.log(data)

  const res = await api.post("/api/leaves", data, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return res.data;
};

export const actionOnLeave = async ({
  selectedAppId,
  decisionType,
  comment,
  decidedAt,
  role,
}) => {
  const response = await api.post("/api/leaves/actionOnLeave", {
    appId: selectedAppId,
    status: decisionType,
    comment,
    decidedAt,
    role,
  });

  return response.data;
};
