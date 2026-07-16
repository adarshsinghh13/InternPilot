import { useMemo, useState } from "react";
import { useApplications } from "../hooks/useApplications";

const emptyForm = {
  companyName: "",
  jobTitle: "",
  jobUrl: "",
  status: "SAVED",
  notes: "",
  appliedAt: "",
};

export default function Applications() {
  const {
    applications,
    loading,
    error,
    search,
    setSearch,
    statusFilter,
    setStatusFilter,
    statusOptions,
    addApplication,
    editApplication,
    removeApplication,
    refetch,
  } = useApplications();

  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [actionError, setActionError] = useState("");

  const isEditing = Boolean(editingId);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setActionError("");

    try {
      const payload = {
        ...form,
        companyName: form.companyName.trim(),
        jobTitle: form.jobTitle.trim(),
        jobUrl: form.jobUrl.trim(),
        notes: form.notes.trim(),
      };

      if (isEditing) {
        await editApplication(editingId, payload);
      } else {
        await addApplication(payload);
      }

      setForm(emptyForm);
      setEditingId(null);
      await refetch();
    } catch (err) {
      setActionError(err?.response?.data?.message || "Unable to save application");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (application) => {
    setEditingId(application.id);
    setForm({
      companyName: application.companyName || "",
      jobTitle: application.jobTitle || "",
      jobUrl: application.jobUrl || "",
      status: application.status || "SAVED",
      notes: application.notes || "",
      appliedAt: application.appliedAt ? application.appliedAt.slice(0, 10) : "",
    });
  };

  const handleDelete = async (id) => {
    try {
      await removeApplication(id);
    } catch (err) {
      setActionError(err?.response?.data?.message || "Unable to delete application");
    }
  };

  const summary = useMemo(() => {
    const total = applications.length;
    const applied = applications.filter((item) => item.status === "APPLIED").length;
    const interviews = applications.filter((item) => item.status === "INTERVIEW").length;

    return { total, applied, interviews };
  }, [applications]);

  return (
    <div className="space-y-6">
      <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="font-['Sora',_sans-serif] text-xl font-semibold tracking-tight text-white">
              Applications
            </h2>
            <p className="mt-2 font-['Inter',_sans-serif] text-sm text-gray-500">
              Track every opportunity from saved to offer.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 text-sm text-gray-400">
            <div className="rounded-xl border border-[#222222] bg-[#181818] px-3 py-2">
              <span className="text-gray-500">Total</span> <span className="text-white">{summary.total}</span>
            </div>
            <div className="rounded-xl border border-[#222222] bg-[#181818] px-3 py-2">
              <span className="text-gray-500">Applied</span> <span className="text-white">{summary.applied}</span>
            </div>
            <div className="rounded-xl border border-[#222222] bg-[#181818] px-3 py-2">
              <span className="text-gray-500">Interviews</span> <span className="text-white">{summary.interviews}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-[360px_minmax(0,1fr)]">
        <form onSubmit={handleSubmit} className="rounded-2xl border border-[#222222] bg-[#111111] p-6 text-sm text-gray-300">
          <h3 className="font-['Sora',_sans-serif] text-lg font-semibold text-white">
            {isEditing ? "Edit application" : "Add application"}
          </h3>
          <div className="mt-4 space-y-4">
            <div>
              <label className="mb-1 block text-sm text-gray-400">Company</label>
              <input
                value={form.companyName}
                onChange={(event) => setForm((current) => ({ ...current, companyName: event.target.value }))}
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
                placeholder="Company name"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Job title</label>
              <input
                value={form.jobTitle}
                onChange={(event) => setForm((current) => ({ ...current, jobTitle: event.target.value }))}
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
                placeholder="Senior Product Designer"
                required
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Job URL</label>
              <input
                value={form.jobUrl}
                onChange={(event) => setForm((current) => ({ ...current, jobUrl: event.target.value }))}
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
                placeholder="https://"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Status</label>
              <select
                value={form.status}
                onChange={(event) => setForm((current) => ({ ...current, status: event.target.value }))}
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
              >
                {statusOptions.filter((option) => option !== "ALL").map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Applied date</label>
              <input
                type="date"
                value={form.appliedAt}
                onChange={(event) => setForm((current) => ({ ...current, appliedAt: event.target.value }))}
                className="w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
              />
            </div>
            <div>
              <label className="mb-1 block text-sm text-gray-400">Notes</label>
              <textarea
                value={form.notes}
                onChange={(event) => setForm((current) => ({ ...current, notes: event.target.value }))}
                className="min-h-24 w-full rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-white outline-none focus:border-[#4f46e5]"
                placeholder="Notes about the role"
              />
            </div>
          </div>

          {actionError ? <p className="mt-4 text-sm text-red-400">{actionError}</p> : null}

          <div className="mt-5 flex gap-3">
            <button
              type="submit"
              disabled={submitting}
              className="rounded-xl bg-[#4f46e5] px-4 py-2 font-medium text-white transition hover:bg-[#4338ca] disabled:cursor-not-allowed disabled:opacity-60"
            >
              {submitting ? "Saving..." : isEditing ? "Save changes" : "Add application"}
            </button>
            {isEditing ? (
              <button
                type="button"
                onClick={() => {
                  setForm(emptyForm);
                  setEditingId(null);
                  setActionError("");
                }}
                className="rounded-xl border border-[#2a2a2a] px-4 py-2 text-gray-300"
              >
                Cancel
              </button>
            ) : null}
          </div>
        </form>

        <div className="rounded-2xl border border-[#222222] bg-[#111111] p-6">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h3 className="font-['Sora',_sans-serif] text-lg font-semibold text-white">Your applications</h3>
              <p className="text-sm text-gray-500">Search and filter your tracker instantly.</p>
            </div>
            <div className="flex flex-col gap-2 sm:flex-row">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                className="rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-sm text-white outline-none focus:border-[#4f46e5]"
                placeholder="Search applications"
              />
              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-xl border border-[#2a2a2a] bg-[#0e0e0e] px-3 py-2 text-sm text-white outline-none focus:border-[#4f46e5]"
              >
                {statusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {loading ? (
            <div className="mt-6 rounded-xl border border-[#222222] bg-[#181818] p-6 text-sm text-gray-400">
              Loading applications...
            </div>
          ) : error ? (
            <div className="mt-6 rounded-xl border border-red-500/30 bg-red-500/10 p-6 text-sm text-red-300">
              {error}
            </div>
          ) : applications.length === 0 ? (
            <div className="mt-6 rounded-xl border border-dashed border-[#2a2a2a] bg-[#181818] p-8 text-center text-sm text-gray-500">
              No applications match your current search or filters.
            </div>
          ) : (
            <div className="mt-6 space-y-3">
              {applications.map((application) => (
                <div key={application.id} className="rounded-xl border border-[#222222] bg-[#181818] p-4">
                  <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                    <div>
                      <div className="flex flex-wrap items-center gap-2">
                        <h4 className="font-semibold text-white">{application.companyName}</h4>
                        <span className="rounded-full border border-[#2a2a2a] bg-[#111111] px-2 py-0.5 text-xs uppercase tracking-wide text-gray-400">
                          {application.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">{application.jobTitle}</p>
                      {application.jobUrl ? (
                        <a href={application.jobUrl} target="_blank" rel="noreferrer" className="mt-2 inline-block text-sm text-[#818cf8] hover:underline">
                          View job posting
                        </a>
                      ) : null}
                      {application.notes ? <p className="mt-2 text-sm text-gray-500">{application.notes}</p> : null}
                    </div>
                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(application)}
                        className="rounded-lg border border-[#2a2a2a] px-3 py-2 text-sm text-gray-300"
                      >
                        Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(application.id)}
                        className="rounded-lg border border-red-500/30 px-3 py-2 text-sm text-red-300"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
