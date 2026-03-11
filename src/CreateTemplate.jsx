//cvMaker\src\CreateTemplate.jsx
import React, { useRef, useState } from "react";
import { createTemplateRequest } from "./api/templateRequests";

export default function CreateTemplate() {
  const [formData, setFormData] = useState({
    templateName: "",
    description: "",
    inspirationFile: null,
  });
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const fileRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("templateName", formData.templateName);
    fd.append("description", formData.description || "");

    if (formData.inspirationFile) {
      // must match backend upload.single("inspirationFile")
      fd.append("inspirationFile", formData.inspirationFile);
    }

    try {
      const res = await createTemplateRequest(fd);

      setErrorMsg("");
      setSuccessMsg(`✅ Request submitted successfully! (ID: ${res.data.id})`);

      setTimeout(() => {
       setSuccessMsg("");
      }, 4000);


      setFormData({ templateName: "", description: "", inspirationFile: null });
      if (fileRef.current) fileRef.current.value = "";
    } catch (err) {
      console.error(err);

setSuccessMsg("");
setErrorMsg(err?.response?.data?.error || "❌ Error submitting request");

setTimeout(() => {
  setErrorMsg("");
}, 5000);
    }
  };

  return (
    <div className="create-template-page">
      <div className="create-template-card">
        <h2>Request New Template</h2>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Template Name *</label>
            <input
              type="text"
              name="templateName"
              value={formData.templateName}
              onChange={handleChange}
              required
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              rows={4}
              value={formData.description}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label>Inspiration File (PDF or image)</label>
            <input
              ref={fileRef}
              type="file"
              name="inspirationFile"
              accept="application/pdf,image/*"
              onChange={handleChange}
              className="form-input"
            />
          </div>
          {successMsg && <div className="form-success-msg">{successMsg}</div>}
          {errorMsg && <div className="form-error-msg">{errorMsg}</div>}

          <button type="submit" className="managecv-btn">
            + Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}
