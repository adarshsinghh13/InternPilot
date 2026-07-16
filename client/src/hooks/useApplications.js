import { useCallback, useEffect, useMemo, useState } from "react";
import { createApplication, deleteApplication, getApplications, updateApplication, STATUS_OPTIONS } from "../services/applications";

export function useApplications() {
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");

  const fetchApplications = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const data = await getApplications();
      setApplications(data);
    } catch (err) {
      setError(err?.response?.data?.message || "Failed to load applications");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const filteredApplications = useMemo(() => {
    return applications.filter((application) => {
      const matchesSearch = [application.companyName, application.jobTitle, application.status, application.notes]
        .filter(Boolean)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase());

      const matchesStatus = statusFilter === "ALL" || application.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [applications, search, statusFilter]);

  const addApplication = useCallback(async (payload) => {
    const item = await createApplication(payload);
    setApplications((current) => [item, ...current]);
    return item;
  }, []);

  const editApplication = useCallback(async (id, payload) => {
    const item = await updateApplication(id, payload);
    setApplications((current) => current.map((application) => (application.id === id ? item : application)));
    return item;
  }, []);

  const removeApplication = useCallback(async (id) => {
    await deleteApplication(id);
    setApplications((current) => current.filter((application) => application.id !== id));
  }, []);

  return {
    applications: filteredApplications,
    allApplications: applications,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusOptions: ["ALL", ...STATUS_OPTIONS],
    refetch: fetchApplications,
    addApplication,
    editApplication,
    removeApplication,
  };
}
