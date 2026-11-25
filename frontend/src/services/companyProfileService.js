import api from "./api";

// Get the logged-in company's profile
export const getCompanyProfile = async () => {
  const response = await api.get("/companies/profile");
  return response.data.data.company;
};

// Create a company profile
export const createCompanyProfile = async (profileData) => {
  const response = await api.post("/companies/profile", profileData);
  return response.data.data.company;
};

// Update an existing company profile
export const updateCompanyProfile = async (profileData) => {
  const response = await api.patch("/companies/profile", profileData);
  return response.data.data.company;
};
