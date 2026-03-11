// src/ManageTemplates.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getTemplates, createTemplate, updateTemplate, deleteTemplate } from "./api/templates";



const ManageTemplates = () => {
  const navigate = useNavigate();

  const handleAddNew = () => {
    navigate('/create-template');
  };

  const handleViewAll = () => {
    navigate('/all-templates');
  };

  return (
    <div className="app-background">
      <div className="managecv-card">
        <h2>Manage CV Templates</h2>

        <div className="managecv-actions">
          <button className="btn-primary" onClick={handleAddNew}>
            <i className="fas fa-plus me-2"></i>
           Request New Template
          </button>
          <button className="btn-secondary" onClick={handleViewAll}>
            <i className="fas fa-file-alt me-2"></i>
            View All Templates
          </button>
        </div>
      </div>
    </div>
  );
};

export default ManageTemplates;
