import React, { useState } from 'react';
import { FiCode, FiPlus, FiX } from 'react-icons/fi';

const SKILL_COLORS = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200',
  'bg-sky-100 text-sky-700 border-sky-200',
  'bg-violet-100 text-violet-700 border-violet-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200',
  'bg-teal-100 text-teal-700 border-teal-200',
];

const SkillsSection = ({ skills, onSkillsChange, error }) => {
  const [inputValue, setInputValue] = useState('');

  const addSkill = () => {
    const trimmed = inputValue.trim();
    if (!trimmed) return;
    if (skills.includes(trimmed)) return;
    onSkillsChange([...skills, trimmed]);
    setInputValue('');
  };

  const removeSkill = (skillToRemove) => {
    onSkillsChange(skills.filter((s) => s !== skillToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
          <FiCode className="text-sky-600 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Skills</h2>
          <p className="text-sm text-gray-500">Technologies and tools you work with</p>
        </div>
      </div>

      {/* Input Row */}
      <div className="flex gap-3 mb-5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="e.g. React, Node.js, MongoDB..."
          className="flex-1 px-4 py-2.5 rounded-lg border border-gray-300 text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-sky-300 focus:border-transparent transition-all"
        />
        <button
          type="button"
          onClick={addSkill}
          className="flex items-center gap-2 px-4 py-2.5 bg-sky-500 hover:bg-sky-600 text-white text-sm font-semibold rounded-lg shadow transition-all duration-200 active:scale-95"
        >
          <FiPlus />
          Add Skill
        </button>
      </div>

      {/* Skills Badges */}
      {skills.length > 0 ? (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill, index) => (
            <span
              key={skill}
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm font-medium rounded-full border ${
                SKILL_COLORS[index % SKILL_COLORS.length]
              } transition-all`}
            >
              {skill}
              <button
                type="button"
                onClick={() => removeSkill(skill)}
                className="ml-1 rounded-full hover:bg-black/10 p-0.5 transition-colors"
                aria-label={`Remove ${skill}`}
              >
                <FiX className="text-xs" />
              </button>
            </span>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 border-2 border-dashed border-gray-200 rounded-lg">
          <FiCode className="mx-auto text-3xl text-gray-300 mb-2" />
          <p className="text-sm text-gray-400">No skills added yet. Start typing above!</p>
        </div>
      )}

      {/* Validation Error */}
      {error && (
        <p className="text-xs text-red-500 mt-3 flex items-center gap-1">
          <FiX className="text-sm" />
          {error}
        </p>
      )}
    </div>
  );
};

export default SkillsSection;
