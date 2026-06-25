import React from 'react';
import { FiMail, FiLinkedin, FiGithub, FiGlobe } from 'react-icons/fi';

const ContactField = ({ label, icon: Icon, error, value, onChange, ...props }) => (
  <div className="flex flex-col gap-1" data-error={!!error}>
    <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
      {Icon && <Icon className="text-indigo-500" />}
      {label}
    </label>
    <div className="relative">
      <span className="absolute inset-y-0 left-3 flex items-center text-gray-400 pointer-events-none">
        <Icon className="text-base" />
      </span>
      <input
        value={value}
        onChange={onChange}
        {...props}
        className={`w-full pl-10 pr-4 py-2.5 rounded-lg border ${
          error
            ? 'border-red-400 bg-red-50 focus:ring-red-300'
            : 'border-gray-300 bg-white focus:ring-indigo-300'
        } text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:border-transparent transition-all`}
      />
    </div>
    {error && <p className="text-xs text-red-500 mt-0.5">{error}</p>}
  </div>
);

const ContactSection = ({ contact, errors, setContactField }) => {
  return (
    <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
          <FiMail className="text-indigo-600 text-lg" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-gray-900">Contact Information</h2>
          <p className="text-sm text-gray-500">How people can reach you</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <ContactField
          label="Email Address"
          icon={FiMail}
          type="email"
          placeholder="john@example.com"
          value={contact.email}
          onChange={(e) => setContactField('email', e.target.value)}
          error={errors['contact.email']}
        />

        <ContactField
          label="LinkedIn URL"
          icon={FiLinkedin}
          type="url"
          placeholder="https://linkedin.com/in/username"
          value={contact.linkedin}
          onChange={(e) => setContactField('linkedin', e.target.value)}
          error={errors['contact.linkedin']}
        />

        <ContactField
          label="GitHub URL"
          icon={FiGithub}
          type="url"
          placeholder="https://github.com/username"
          value={contact.github}
          onChange={(e) => setContactField('github', e.target.value)}
          error={errors['contact.github']}
        />

        <ContactField
          label="Personal Website"
          icon={FiGlobe}
          type="url"
          placeholder="https://yourwebsite.com"
          value={contact.website}
          onChange={(e) => setContactField('website', e.target.value)}
          error={errors['contact.website']}
        />
      </div>
    </div>
  );
};

export default ContactSection;
