import React from 'react';
import { FiFolder, FiPlus, FiTrash2, FiGithub, FiExternalLink } from 'react-icons/fi';
import ImageUpload from './ImageUpload';

const Field = ({ label, icon: Icon, error, value, onChange, ...props }) => (
  <div className="flex flex-col gap-1" data-error={!!error}>
    <label className="text-xs font-medium text-gray-600 flex items-center gap-1">
      {Icon && <Icon className="text-gray-500" />}
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      {...props}
      className={`w-full px-3 py-2 rounded-lg border text-sm ${
        error ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
      } focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all`}
    />
    {error && <p className="text-xs text-red-500">{error}</p>}
  </div>
);

const ProjectCard = ({ project, index, errors, onRemove, onChange }) => (
  <div className="border border-gray-200 rounded-xl overflow-hidden bg-gray-50 hover:bg-white hover:shadow-md transition-all duration-300">
    {/* Card header */}
    <div className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-100">
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-blue-100 flex items-center justify-center">
          <FiFolder className="text-blue-600 text-sm" />
        </div>
        <span className="text-sm font-semibold text-gray-700">
          {project.name || `Project #${index + 1}`}
        </span>
      </div>
      <button
        type="button"
        onClick={() => onRemove(index)}
        className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
      >
        <FiTrash2 />
        Remove
      </button>
    </div>

    <div className="p-5 grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Project thumbnail — spans full width on desktop */}
      <div className="md:col-span-2">
        <ImageUpload
          label="Project Thumbnail"
          hint="PNG, JPG, JPEG, WEBP — max 5 MB"
          value={project.image}
          onChange={(imgData) => onChange(index, 'image', imgData)}
          shape="square"
        />
      </div>

      <Field
        label="Project Name *"
        type="text"
        placeholder="e.g. E-Commerce Platform"
        value={project.name}
        onChange={(e) => onChange(index, 'name', e.target.value)}
        error={errors[`project_${index}_name`]}
      />
      <Field
        label="Tech Stack"
        type="text"
        placeholder="React, Node.js, MongoDB"
        value={project.techStack}
        onChange={(e) => onChange(index, 'techStack', e.target.value)}
      />

      <div className="md:col-span-2 flex flex-col gap-1">
        <label className="text-xs font-medium text-gray-600">Description</label>
        <textarea
          rows={3}
          placeholder="Describe what this project does..."
          value={project.description}
          onChange={(e) => onChange(index, 'description', e.target.value)}
          className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent resize-none transition-all"
        />
      </div>

      <Field
        label="GitHub Link"
        icon={FiGithub}
        type="url"
        placeholder="https://github.com/user/repo"
        value={project.githubLink}
        onChange={(e) => onChange(index, 'githubLink', e.target.value)}
        error={errors[`project_${index}_github`]}
      />
      <Field
        label="Live Demo"
        icon={FiExternalLink}
        type="url"
        placeholder="https://yourproject.com"
        value={project.liveLink}
        onChange={(e) => onChange(index, 'liveLink', e.target.value)}
        error={errors[`project_${index}_live`]}
      />
    </div>
  </div>
);

const ProjectsSection = ({ projects, errors, onAdd, onRemove, onChange }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FiFolder className="text-blue-600 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Projects</h2>
          <p className="text-sm text-gray-500">Showcase your best work with images</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-lg shadow transition-all duration-200 active:scale-95"
      >
        <FiPlus />
        Add Project
      </button>
    </div>

    {projects.length > 0 ? (
      <div className="flex flex-col gap-5">
        {projects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            errors={errors}
            onRemove={onRemove}
            onChange={onChange}
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
        <FiFolder className="mx-auto text-4xl text-gray-300 mb-3" />
        <p className="text-sm font-medium text-gray-400 mb-1">No projects yet</p>
        <p className="text-xs text-gray-300">Click "Add Project" to showcase your work</p>
      </div>
    )}
  </div>
);

export default ProjectsSection;
