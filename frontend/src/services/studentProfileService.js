import api from "./api";

// Fetch the logged-in student's profile
export const getStudentProfile = async () => {
  const response = await api.get("/students/profile");
  return response.data.data;
};

// Create a new student profile
export const createStudentProfile = async (profileData) => {
  const response = await api.post("/students/profile", profileData);
  return response.data.data;
};

// Update the student's profile
export const updateStudentProfile = async (profileData) => {
  const response = await api.patch("/students/profile", profileData);
  return response.data.data;
};