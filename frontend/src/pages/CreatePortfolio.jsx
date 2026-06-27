import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  FiEye,
  FiCheck,
} from 'react-icons/fi';

import PersonalInfoSection from '../components/portfolio/PersonalInfoSection';
import ContactSection from '../components/portfolio/ContactSection';
import SkillsSection from '../components/portfolio/SkillsSection';
import ProjectsSection from '../components/portfolio/ProjectsSection';
import ExperienceSection from '../components/portfolio/ExperienceSection';
import Toast from '../components/Toast';
import { usePortfolio } from '../context/PortfolioContext';
import { useAuth } from '../context/AuthContext';

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

  const { username: editUsername } = useParams();
  const { token } = useAuth();
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  /* ── Restore form from context when returning from preview, OR fetch from API if editing ── */
  useEffect(() => {
    const fetchPortfolio = async () => {
      if (editUsername && !portfolioData) {
        setLoading(true);
        try {
          const res = await fetch(`/api/portfolio/${editUsername}`);
          const result = await res.json();
          if (res.ok) {
            const { skills: fetchedSkills, _id, __v, createdAt, updatedAt, ...fetchedForm } = result;
            setForm((prev) => ({ ...prev, ...fetchedForm }));
            if (fetchedSkills) setSkills(fetchedSkills);
          } else {
            showToast('error', 'Failed to load portfolio for editing');
          }
        } catch (err) {
          showToast('error', 'Failed to load portfolio');
        } finally {
          setLoading(false);
        }
      } else if (portfolioData) {
        const { skills: ctxSkills, ...ctxForm } = portfolioData;
        setForm((prev) => ({ ...prev, ...ctxForm }));
        if (ctxSkills) setSkills(ctxSkills);
      }
    };

    fetchPortfolio();
  }, [editUsername]); // removed portfolioData from dep array to avoid loops, only run on mount/route change

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

  /* ── Direct Update (Edit Mode) ── */
  const handleUpdate = async (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      const firstErrorEl = document.querySelector('[data-error="true"]');
      firstErrorEl?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      return;
    }

    setIsUpdating(true);
    try {
      const { password, confirmPassword, ...formFields } = form;
      const portfolioPayload = { ...formFields, skills };

      const res = await fetch(`/api/portfolio/${editUsername}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(portfolioPayload),
      });

      const result = await res.json();
      if (!res.ok) {
        throw new Error(result.message || 'Failed to update portfolio');
      }

      showToast('success', '🎉 Portfolio updated successfully!');
      setTimeout(() => navigate('/dashboard', { replace: true }), 1500);
    } catch (err) {
      showToast('error', err.message || 'Something went wrong.');
      setIsUpdating(false);
    }
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
            {editUsername ? 'Edit Your ' : 'Create Your '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              Developer Portfolio
            </span>
          </h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto">
            {editUsername
              ? 'Update your information and save changes to your professional portfolio.'
              : 'Fill in your information and generate a professional portfolio website in minutes.'}
          </p>
        </div>

        {/* ── Progress Indicator ── */}
        {!editUsername && <ProgressIndicator currentStep={currentStep} />}

        {loading ? (
          <div className="text-center py-20">
            <div className="w-12 h-12 rounded-full border-4 border-blue-200 border-t-blue-600 animate-spin mx-auto mb-4" />
            <p className="text-gray-500 font-medium">Loading portfolio data...</p>
          </div>
        ) : (
        <form onSubmit={editUsername ? handleUpdate : handlePreview} noValidate>
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
            <div className="flex flex-col-reverse sm:flex-row items-center justify-end gap-4 pt-2 pb-10">

              <button
                type="submit"
                disabled={isUpdating}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold rounded-xl shadow-lg hover:shadow-blue-200 hover:shadow-xl transition-all duration-200 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {editUsername ? (
                  isUpdating ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      Updating...
                    </>
                  ) : (
                    <>
                      <FiCheck />
                      Confirm Update
                    </>
                  )
                ) : (
                  <>
                    <FiEye />
                    Preview Portfolio
                  </>
                )}
              </button>
            </div>

          </div>
        </form>
        )}
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
