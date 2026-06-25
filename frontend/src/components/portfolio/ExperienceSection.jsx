import React, { useState } from 'react';
import { FiBriefcase, FiPlus, FiTrash2, FiChevronDown, FiChevronUp } from 'react-icons/fi';

const ExperienceCard = ({ exp, index, errors, onRemove, onChange }) => {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden hover:shadow-md transition-all duration-300">
      {/* Clickable header */}
      <div
        className="flex items-center justify-between px-5 py-3.5 bg-gray-50 cursor-pointer hover:bg-gray-100 transition-colors"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-indigo-100 flex items-center justify-center">
            <FiBriefcase className="text-indigo-600 text-sm" />
          </div>
          <span className="text-sm font-semibold text-gray-700">
            {exp.company || `Experience #${index + 1}`}
            {exp.role ? ` — ${exp.role}` : ''}
          </span>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); onRemove(index); }}
            className="flex items-center gap-1 text-xs text-red-400 hover:text-red-600 hover:bg-red-50 px-2 py-1 rounded-lg transition-all"
          >
            <FiTrash2 />
            Remove
          </button>
          {expanded ? (
            <FiChevronUp className="text-gray-400" />
          ) : (
            <FiChevronDown className="text-gray-400" />
          )}
        </div>
      </div>

      {/* Expandable body */}
      {expanded && (
        <div className="p-5 bg-white grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Company */}
          <div className="flex flex-col gap-1" data-error={!!errors[`exp_${index}_company`]}>
            <label className="text-xs font-medium text-gray-600">Company *</label>
            <input
              type="text"
              placeholder="e.g. Google Inc."
              value={exp.company}
              onChange={(e) => onChange(index, 'company', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-sm ${
                errors[`exp_${index}_company`] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all`}
            />
            {errors[`exp_${index}_company`] && (
              <p className="text-xs text-red-500">{errors[`exp_${index}_company`]}</p>
            )}
          </div>

          {/* Role */}
          <div className="flex flex-col gap-1" data-error={!!errors[`exp_${index}_role`]}>
            <label className="text-xs font-medium text-gray-600">Role *</label>
            <input
              type="text"
              placeholder="e.g. Senior Frontend Developer"
              value={exp.role}
              onChange={(e) => onChange(index, 'role', e.target.value)}
              className={`w-full px-3 py-2 rounded-lg border text-sm ${
                errors[`exp_${index}_role`] ? 'border-red-400 bg-red-50' : 'border-gray-300 bg-white'
              } focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all`}
            />
            {errors[`exp_${index}_role`] && (
              <p className="text-xs text-red-500">{errors[`exp_${index}_role`]}</p>
            )}
          </div>

          {/* Duration */}
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Duration</label>
            <input
              type="text"
              placeholder="e.g. Jan 2022 – Present"
              value={exp.duration}
              onChange={(e) => onChange(index, 'duration', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent transition-all"
            />
          </div>

          {/* Description */}
          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs font-medium text-gray-600">Description</label>
            <textarea
              rows={3}
              placeholder="What did you work on? What did you achieve?"
              value={exp.description}
              onChange={(e) => onChange(index, 'description', e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent resize-none transition-all"
            />
          </div>
        </div>
      )}
    </div>
  );
};

const ExperienceSection = ({ experience, errors, onAdd, onRemove, onChange }) => (
  <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <FiBriefcase className="text-indigo-600 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Work Experience</h2>
          <p className="text-sm text-gray-500">Your professional journey</p>
        </div>
      </div>
      <button
        type="button"
        onClick={onAdd}
        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-semibold rounded-lg shadow transition-all duration-200 active:scale-95"
      >
        <FiPlus />
        Add Experience
      </button>
    </div>

    {experience.length > 0 ? (
      <div className="flex flex-col gap-3">
        {experience.map((exp, index) => (
          <ExperienceCard
            key={index}
            exp={exp}
            index={index}
            errors={errors}
            onRemove={onRemove}
            onChange={onChange}
          />
        ))}
      </div>
    ) : (
      <div className="text-center py-10 border-2 border-dashed border-gray-200 rounded-xl">
        <FiBriefcase className="mx-auto text-4xl text-gray-300 mb-3" />
        <p className="text-sm font-medium text-gray-400 mb-1">No experience added</p>
        <p className="text-xs text-gray-300">Click "Add Experience" to list your work history</p>
      </div>
    )}
  </div>
);

export default ExperienceSection;
