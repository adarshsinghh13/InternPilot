import api from "./api";

export const STATUS_OPTIONS = ["SAVED", "APPLIED", "OA", "INTERVIEW", "OFFER", "REJECTED"];

export const getApplications = async () => {
  const { data } = await api.get("/applications");
  return data.applications ?? [];
};

export const createApplication = async (payload) => {
  const { data } = await api.post("/applications", payload);
  return data.application;
};

export const updateApplication = async (id, payload) => {
  const { data } = await api.patch(`/applications/${id}`, payload);
  return data.application;
};

export const deleteApplication = async (id) => {
  const { data } = await api.delete(`/applications/${id}`);
  return data;
};
