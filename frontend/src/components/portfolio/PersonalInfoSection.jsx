import React, { useState } from 'react';
import {
  FiUser,
  FiTag,
  FiFileText,
  FiAtSign,
  FiLock,
  FiEye,
  FiEyeOff,
} from 'react-icons/fi';
import ImageUpload from './ImageUpload';

/* ─── Reusable text input ─── */
const InputField = ({ label, icon: Icon, error, value, onChange, ...props }) => (
  <div className="flex flex-col gap-1" data-error={!!error}>
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
      {Icon && <Icon className="text-blue-500" />}
      {label}
    </label>
    <input
      value={value}
      onChange={onChange}
      {...props}
      className={`w-full px-4 py-2.5 rounded-lg border ${
        error
          ? 'border-red-400 bg-red-50 focus:ring-red-300'
          : 'border-gray-300 bg-white focus:ring-blue-300'
      } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
    />
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);

/* ─── Password input with show/hide toggle ─── */
const PasswordField = ({ label, error, value, onChange, id }) => {
  const [show, setShow] = useState(false);

  return (
    <div className="flex flex-col gap-1" data-error={!!error}>
      <label
        htmlFor={id}
        className="text-sm font-medium text-gray-700 flex items-center gap-2"
      >
        <FiLock className="text-blue-500" />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={show ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={label === 'Password' ? 'Minimum 6 characters' : 'Re-enter your password'}
          className={`w-full pl-4 pr-11 py-2.5 rounded-lg border ${
            error
              ? 'border-red-400 bg-red-50 focus:ring-red-300'
              : 'border-gray-300 bg-white focus:ring-blue-300'
          } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
        />
        <button
          type="button"
          onClick={() => setShow((s) => !s)}
          className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
          tabIndex={-1}
          aria-label={show ? 'Hide password' : 'Show password'}
        >
          {show ? <FiEyeOff className="text-base" /> : <FiEye className="text-base" />}
        </button>
      </div>
      {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
    </div>
  );
};

/* ─── Section Component ─── */
const PersonalInfoSection = ({ form, errors, setField }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      {/* Section header */}
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
          <FiUser className="text-blue-600 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Personal Information</h2>
          <p className="text-sm text-gray-500">Your account credentials and basic details</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

        {/* ── Account credentials block ── */}
        <div className="md:col-span-2">
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
            <p className="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-4">
              Account Credentials
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <InputField
                label="Username"
                icon={FiAtSign}
                type="text"
                placeholder="e.g. johndoe (URL-friendly)"
                value={form.username}
                onChange={(e) => setField('username', e.target.value.toLowerCase())}
                error={errors.username}
                autoComplete="username"
              />
              <div className="hidden md:block" />

              <PasswordField
                id="password"
                label="Password"
                value={form.password}
                onChange={(e) => setField('password', e.target.value)}
                error={errors.password}
              />
              <PasswordField
                id="confirmPassword"
                label="Confirm Password"
                value={form.confirmPassword}
                onChange={(e) => setField('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
              />
            </div>
          </div>
        </div>

        {/* ── Profile details ── */}
        <InputField
          label="Full Name"
          icon={FiUser}
          type="text"
          placeholder="e.g. John Doe"
          value={form.fullName}
          onChange={(e) => setField('fullName', e.target.value)}
          error={errors.fullName}
          autoComplete="name"
        />

        <InputField
          label="Professional Title"
          icon={FiTag}
          type="text"
          placeholder="e.g. Full Stack Developer"
          value={form.title}
          onChange={(e) => setField('title', e.target.value)}
          error={errors.title}
        />

        {/* ── Profile image upload — full width ── */}
        <div className="md:col-span-2">
          <ImageUpload
            label="Profile Photo"
            hint="PNG, JPG, JPEG, WEBP — max 5 MB · Drag & drop or click to upload"
            value={form.profileImage}
            onChange={(imgData) => setField('profileImage', imgData)}
            shape="square"
          />
          {errors.profileImage && (
            <p className="text-xs text-red-500 mt-1">{errors.profileImage}</p>
          )}
        </div>

        {/* Bio — full width */}
        <div className="md:col-span-2 flex flex-col gap-1">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <FiFileText className="text-blue-500" />
            Bio
          </label>
          <textarea
            rows={4}
            placeholder="Tell us a little about yourself..."
            value={form.bio}
            onChange={(e) => setField('bio', e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg border border-gray-300 bg-white text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300 focus:border-transparent transition-all resize-none"
          />
        </div>

      </div>
    </div>
  );
};

export default PersonalInfoSection;
