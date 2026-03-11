// src/AllTemplates.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTemplates, deleteTemplate, updateTemplate } from "./api/templates";
import { toImgUrl } from "./utils/templateImage";

function AllTemplates() {
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [templateToDelete, setTemplateToDelete] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const data = await getTemplates(); // merr të gjitha, edhe inactive
        setTemplates(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load templates");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const openModal = (t) => {
    setTemplateToDelete(t);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setTemplateToDelete(null);
  };

  const confirmDelete = async () => {
    if (!templateToDelete) return;
    try {
      await deleteTemplate(templateToDelete.id);
      setTemplates((prev) =>
        prev.filter((t) => t.id !== templateToDelete.id)
      );
    } catch (e) {
      alert("Failed to delete");
    } finally {
      closeModal();
    }
  };

  // 👉 dropdown handler për statusin
  const handleStatusChange = async (id, value) => {
    const is_active = value === "active" ? 1 : 0;
    const t = templates.find((x) => x.id === id);
    if (!t) return;

    try {
      await updateTemplate(id, {
        templateName: t.templateName,
        description: t.description,
        preview_image_url: t.preview_image_url,
        is_active,
      });

      setTemplates((prev) =>
        prev.map((x) => (x.id === id ? { ...x, is_active } : x))
      );
    } catch (err) {
      console.error(err);
      alert("Failed to update status");
    }
  };

  if (loading) return <div className="container mt-5">Loading…</div>;
  if (error) return <div className="container mt-5 text-danger">{error}</div>;

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">All Templates</h2>
      <div className="row">
        {templates.map((template, index) => {
          // foto nga uploads ose fallback statik
          const fallback = `/assets/img/cv${(index % 7) + 1}.png`;
          const realFromUpload = toImgUrl(template.preview_image_url);
          const imgSrc = realFromUpload || fallback;

          const statusValue =
            template.is_active === 1 ||
            template.is_active === true ||
            template.is_active === "1"
              ? "active"
              : "hidden";

          return (
            <div className="col-md-4 mb-4" key={template.id}>
              <div className="card h-100 text-center shadow-sm">
                <Link
                  to={`/admin/template/${template.id}`}
                  className="text-decoration-none"
                >
                  <img
                    src={imgSrc}
                    className="card-img-top"
                    alt={template.templateName}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title text-dark">
                      {template.templateName}
                    </h5>
                    <p className="text-muted small">
                      {template.description || "A CV template"}
                    </p>
                  </div>
                </Link>

                <div className="card-body">
                  {/* Dropdown i statusit */}
                  <div className="mb-2">
                    <label className="me-2">Status:</label>
                    <select
                      value={statusValue}
                      onChange={(e) =>
                        handleStatusChange(template.id, e.target.value)
                      }
                      className="form-select d-inline-block w-auto"
                    >
                      <option value="active">Active</option>
                      <option value="hidden">Hidden</option>
                    </select>
                  </div>

                  <button
                    className="btn btn-danger"
                    onClick={() => openModal(template)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirm Delete</h5>
                <button className="btn-close" onClick={closeModal}></button>
              </div>
              <div className="modal-body">
                Delete <strong>{templateToDelete?.templateName}</strong>?
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={closeModal}>
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDelete}>
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllTemplates;
