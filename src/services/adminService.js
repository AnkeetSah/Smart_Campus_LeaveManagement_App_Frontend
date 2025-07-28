import api from "./api";


export const addUser = async ({ extractedData, selectedRole }) => {
  
  const res = await api.post("api/admin/add-user", {
    users: extractedData,
    role: selectedRole,
  });
  return res.data;
};
