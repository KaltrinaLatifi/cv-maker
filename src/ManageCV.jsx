import React, { useEffect, useState } from "react";
import { getCVs, deleteCV } from "./api/manageCv";

const ManageCv = () => {
  const [cvs, setCvs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCVs = async () => {
      try {
        const data = await getCVs();
        setCvs(data || []);
      } catch (error) {
        console.error("Error fetching CVs:", error);
        setCvs([]);
      } finally {
        setLoading(false);
      }
    };
    fetchCVs();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this CV?")) return;
    try {
      await deleteCV(id);
      setCvs((prev) => prev.filter((cv) => cv.id !== id));
    } catch (error) {
      console.error("Error deleting CV:", error);
    }
  };

  if (loading) return <div className="text-muted" style={{ padding: 20 }}>Loading...</div>;

  return (
    <div className="admin-page">
      <div className="admin-card">
        <h2 className="admin-title">Manage CVs</h2>

        {cvs.length === 0 ? (
          <p className="text-muted mb-0">No CVs found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table admin-table align-middle mb-0">
              <thead>
                <tr>
                  <th style={{ width: 90 }}>ID</th>
                  <th>Title</th>
                  <th>User</th>
                  <th>Template</th>
                  <th style={{ width: 140 }}>Created At</th>
                  <th style={{ width: 140 }}>Actions</th>
                </tr>
              </thead>

              <tbody>
                {cvs.map((cv) => (
                  <tr key={cv.id}>
                    <td>{cv.id}</td>
                    <td>{cv.cvTitle}</td>
                    <td>{cv.userName || "Unknown"}</td>
                    <td>{cv.templateName || "No template"}</td>
                    <td className="text-muted">
                      {cv.createdAt ? new Date(cv.createdAt).toLocaleDateString() : ""}
                    </td>
                    <td>
                      <button
                        className="btn btn-danger btn-sm admin-danger"
                        onClick={() => handleDelete(cv.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default ManageCv;
