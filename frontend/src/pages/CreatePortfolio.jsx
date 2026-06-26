import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  FiEye,
  FiSave,
  FiCheck,
} from 'react-icons/fi';

import PersonalInfoSection from '../components/portfolio/PersonalInfoSection';
import ContactSection from '../components/portfolio/ContactSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import Toast from '../components/Toast';
import { usePortfolio } from '../context/PortfolioContext';

/* ─────────────────────────────────────────
   Progress Step Indicator
───────────────────────────────────────── */
const STEPS = ['Fill Information', 'Preview Portfolio', 'Publish Portfolio'];

const ProgressIndicator = ({ currentStep }) => (
  <div className="flex items-center justify-center gap-0 mb-10">
    {STEPS.map((step, i) => {
      const stepNum = i + 1;
      const isCompleted = stepNum < currentStep;
      const isActive = stepNum === currentStep;
      return (
        <React.Fragment key={step}>
          <div className="flex flex-col items-center gap-1.5">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300 ${
                isCompleted
                  ? 'bg-blue-600 border-blue-600 text-white'
                  : isActive
                  ? 'bg-white border-blue-600 text-blue-600 shadow-md shadow-blue-100'
                  : 'bg-white border-gray-300 text-gray-400'
              }`}
            >
              {isCompleted ? <FiCheck className="text-base" /> : stepNum}
            </div>
            <span
              className={`text-xs font-medium whitespace-nowrap ${
                isActive ? 'text-blue-600' : isCompleted ? 'text-gray-500' : 'text-gray-400'
              }`}
            >
              Step {stepNum}: {step}
            </span>
          </div>
          {i < STEPS.length - 1 && (
            <div
              className={`h-0.5 w-16 sm:w-24 mx-1 mb-5 rounded-full transition-all duration-500 ${
                isCompleted ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            />
          )}
        </React.Fragment>
      );
    })}
  </div>
);

/* Toast component imported from ../components/Toast */

/* ─────────────────────────────────────────
   Validation helpers
───────────────────────────────────────── */
const isValidUrl = (val) => !val || /^(https?:\/\/).+/.test(val);
const isValidEmail = (val) => !val || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
const isUrlFriendly = (val) => /^[a-z0-9_-]+$/.test(val);

/* ─────────────────────────────────────────
   CreatePortfolio Page (no external form lib)
───────────────────────────────────────── */
const defaultForm = {
  username: '',
  password: '',
  confirmPassword: '',
  fullName: '',
  title: '',
  profileImage: { publicId: '', url: '' },
  bio: '',
  contact: { email: '', linkedin: '', github: '', website: '' },
  projects: [],
  experience: [],
};

const CreatePortfolio = () => {
  const navigate = useNavigate();
  const { portfolioData, setPortfolioData } = usePortfolio();

  const [currentStep] = useState(1);
  const [form, setForm] = useState(defaultForm);
  const [skills, setSkills] = useState([]);
  const [errors, setErrors] = useState({});
  const [toast, setToast] = useState({ type: '', message: '' });

  /* ── Restore form from context when returning from preview ── */
  useEffect(() => {
    if (portfolioData) {
      const { skills: ctxSkills, ...ctxForm } = portfolioData;
      setForm((prev) => ({ ...prev, ...ctxForm }));
      if (ctxSkills) setSkills(ctxSkills);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  /* ── Field change helpers ── */
  const setField = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setErrors((prev) => ({ ...prev, [field]: '' }));
  };

  const setContactField = (field, value) => {
    setForm((prev) => ({ ...prev, contact: { ...prev.contact, [field]: value } }));
    setErrors((prev) => ({ ...prev, [`contact.${field}`]: '' }));
  };

  /* ── Projects helpers ── */
  const addProject = () =>
    setForm((prev) => ({
      ...prev,
      projects: [
        ...prev.projects,
        {
          name: '',
          description: '',
          techStack: '',
          githubLink: '',
          liveLink: '',
          image: { publicId: '', url: '' },
        },
      ],
    }));

  const removeProject = (index) =>
    setForm((prev) => ({
      ...prev,
      projects: prev.projects.filter((_, i) => i !== index),
    }));

  const setProjectField = (index, field, value) =>
    setForm((prev) => {
      const updated = [...prev.projects];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, projects: updated };
    });

  /* ── Experience helpers ── */
  const addExperience = () =>
    setForm((prev) => ({
      ...prev,
      experience: [
        ...prev.experience,
        { company: '', role: '', duration: '', description: '' },
      ],
    }));

  const removeExperience = (index) =>
    setForm((prev) => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index),
    }));

  const setExperienceField = (index, field, value) =>
    setForm((prev) => {
      const updated = [...prev.experience];
      updated[index] = { ...updated[index], [field]: value };
      return { ...prev, experience: updated };
    });

  /* ── Validation ── */
  const validate = () => {
    const errs = {};

    if (!form.username.trim()) errs.username = 'Username is required';
    else if (form.username.length < 3) errs.username = 'Username must be at least 3 characters';
    else if (!isUrlFriendly(form.username))
      errs.username = 'Username must be URL-friendly (lowercase letters, numbers, _ or -)';

    if (!form.password) errs.password = 'Password is required';
    else if (form.password.length < 6) errs.password = 'Password must be at least 6 characters';

    if (!form.confirmPassword) errs.confirmPassword = 'Please confirm your password';
    else if (form.confirmPassword !== form.password) errs.confirmPassword = 'Passwords do not match';

    if (!form.fullName.trim()) errs.fullName = 'Full Name is required';
    if (!form.title.trim()) errs.title = 'Professional Title is required';

    // profileImage is { publicId, url } — validate the url string, not the object
    if (form.profileImage?.url && !isValidUrl(form.profileImage.url))
      errs.profileImage = 'Please enter a valid URL';

    // Email is required — it's the account identifier for registration
    if (!form.contact.email.trim()) errs['contact.email'] = 'Email is required';
    else if (!isValidEmail(form.contact.email))
      errs['contact.email'] = 'Email is invalid';

    ['linkedin', 'github', 'website'].forEach((key) => {
      if (form.contact[key] && !isValidUrl(form.contact[key]))
        errs[`contact.${key}`] = 'Please enter a valid URL';
    });

    if (skills.length === 0) errs.skills = 'Please enter at least one skill';

    form.projects.forEach((p, i) => {
      if (!p.name.trim()) errs[`project_${i}_name`] = 'Project name is required';
      if (p.githubLink && !isValidUrl(p.githubLink)) errs[`project_${i}_github`] = 'Enter a valid URL';
      if (p.liveLink && !isValidUrl(p.liveLink)) errs[`project_${i}_live`] = 'Enter a valid URL';
    });

    form.experience.forEach((e, i) => {
      if (!e.company.trim()) errs[`exp_${i}_company`] = 'Company is required';
      if (!e.role.trim()) errs[`exp_${i}_role`] = 'Role is required';
    });

    return errs;
  };

  /* ── Toast ── */
  const showToast = (type, message) => {
    setToast({ type, message });
    setTimeout(() => setToast({ type: '', message: '' }), 4000);
  };

  /* ── Preview: Validate → set context → navigate to /preview ── */
  const handlePreview = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorEl = document.querySelector('[data-error="true"]');
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    // Store full form data (including password for the publish step) in context
    setPortfolioData({ ...form, skills });
    navigate('/preview');
  };

  /* ── Save Draft ── */
  const onSaveDraft = () => {
    localStorage.setItem('portfolio_draft', JSON.stringify({ ...form, skills }));
    showToast('success', '💾 Draft saved locally!');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">

        {/* ── Page Header ── */}
        <div className="text-center mb-10">
          <span className="inline-block bg-blue-100 text-blue-700 text-xs font-semibold px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Developer Portfolio Generator
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-3 leading-tight">
            Create Your{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Developer Portfolio
            </span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            Fill in your information and generate a professional portfolio website in minutes.
          </p>
        </div>

        {/* ── Progress Indicator ── */}
        <ProgressIndicator currentStep={currentStep} />

        {/* ── Form ── */}
        <form onSubmit={handlePreview} noValidate>
          <div className="flex flex-col gap-6">

            <PersonalInfoSection
              form={form}
              errors={errors}
              setField={setField}
            />

            <ContactSection
              contact={form.contact}
              errors={errors}
              setContactField={setContactField}
            />

            <SkillsSection
              skills={skills}
              onSkillsChange={setSkills}
              error={errors.skills}
            />

            <ProjectsSection
              projects={form.projects}
              errors={errors}
              onAdd={addProject}
              onRemove={removeProject}
              onChange={setProjectField}
            />

            <ExperienceSection
              experience={form.experience}
              errors={errors}
              onAdd={addExperience}
              onRemove={removeExperience}
              onChange={setExperienceField}
            />

            {/* ── Action Buttons ── */}
            <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2 pb-10">
              <button
                type="button"
                onClick={onSaveDraft}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border-2 border-gray-300 hover:border-blue-400 text-gray-600 hover:text-blue-600 font-semibold rounded-xl transition-all duration-200"
              >
                <FiSave />
                Save Draft
              </button>

              <button
                type="submit"
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-200 hover:shadow-xl transition-all duration-200 active:scale-95"
              >
                <FiEye />
                Preview Portfolio
              </button>
            </div>

          </div>
        </form>
      </div>

      <Toast
        type={toast.type}
        message={toast.message}
        onClose={() => setToast({ type: '', message: '' })}
      />
    </div>
  );
};

export default CreatePortfolio;
