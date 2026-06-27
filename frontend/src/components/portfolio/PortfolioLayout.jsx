import React from 'react';
import {
  FiGithub,
  FiExternalLink,
  FiMail,
  FiLinkedin,
  FiGlobe,
  FiBriefcase,
  FiCode,
  FiUser,
  FiMapPin,
} from 'react-icons/fi';

/* ═══════════════════════════════════════════════════════════
   PortfolioLayout — shared by Preview and Public Portfolio.
   Props:
     data       — portfolio object
     isPreview  — if true, data comes from context (may have blob URLs)
   ═══════════════════════════════════════════════════════════ */

/* ── Hero Section ────────────────────────────────────────── */
const HeroSection = ({ fullName, title, bio, profileImage }) => (
  <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
    {/* Decorative blurred circles */}
    <div className="absolute top-[-120px] left-[-80px] w-96 h-96 bg-blue-500/20 rounded-full blur-3xl pointer-events-none" />
    <div className="absolute bottom-[-100px] right-[-60px] w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />

    <div className="relative max-w-5xl mx-auto px-6 py-20 md:py-28 flex flex-col md:flex-row items-center gap-10">
      {/* Profile Image */}
      {profileImage?.url && (
        <div className="shrink-0">
          <div className="w-40 h-40 md:w-48 md:h-48 rounded-full ring-4 ring-white/20 shadow-2xl overflow-hidden">
            <img
              src={profileImage.url}
              alt={fullName}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      )}

      {/* Text */}
      <div className="text-center md:text-left flex-1">
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-3">
          {fullName}
        </h1>
        {title && (
          <p className="text-lg md:text-xl text-blue-300 font-medium mb-5">
            {title}
          </p>
        )}
        {bio && (
          <p className="text-gray-300 leading-relaxed max-w-xl text-base">
            {bio}
          </p>
        )}
      </div>
    </div>
  </section>
);

/* ── About Section ───────────────────────────────────────── */
const AboutSection = ({ bio }) => {
  if (!bio) return null;
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FiUser className="text-blue-600 text-lg" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">About Me</h2>
        </div>
        <div className="bg-gradient-to-br from-gray-50 to-blue-50/30 rounded-2xl p-8 border border-gray-100">
          <p className="text-gray-600 leading-relaxed text-base md:text-lg whitespace-pre-line">
            {bio}
          </p>
        </div>
      </div>
    </section>
  );
};

/* ── Skills Section ──────────────────────────────────────── */
const SKILL_PALETTE = [
  'bg-blue-100 text-blue-700 border-blue-200',
  'bg-indigo-100 text-indigo-700 border-indigo-200',
  'bg-sky-100 text-sky-700 border-sky-200',
  'bg-violet-100 text-violet-700 border-violet-200',
  'bg-cyan-100 text-cyan-700 border-cyan-200',
  'bg-teal-100 text-teal-700 border-teal-200',
  'bg-emerald-100 text-emerald-700 border-emerald-200',
  'bg-purple-100 text-purple-700 border-purple-200',
];

const SkillsDisplay = ({ skills }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-sky-100 flex items-center justify-center">
            <FiCode className="text-sky-600 text-lg" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Skills & Technologies</h2>
        </div>
        <div className="flex flex-wrap gap-3">
          {skills.map((skill, i) => (
            <span
              key={skill}
              className={`inline-flex items-center px-4 py-2 text-sm font-semibold rounded-full border ${
                SKILL_PALETTE[i % SKILL_PALETTE.length]
              } transition-transform hover:scale-105`}
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Project Card ────────────────────────────────────────── */
const ProjectCard = ({ project }) => {
  const techList =
    typeof project.techStack === 'string'
      ? project.techStack.split(',').map((s) => s.trim()).filter(Boolean)
      : Array.isArray(project.techStack)
      ? project.techStack
      : [];

  return (
    <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col">
      {/* Project Image */}
      {project.image?.url && (
        <div className="relative h-52 overflow-hidden">
          <img
            src={project.image.url}
            alt={project.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
          {project.name}
        </h3>

        {project.description && (
          <p className="text-gray-500 text-sm leading-relaxed mb-4 flex-1">
            {project.description}
          </p>
        )}

        {/* Tech stack tags */}
        {techList.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-5">
            {techList.map((tech) => (
              <span
                key={tech}
                className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        )}

        {/* Action buttons */}
        <div className="flex items-center gap-3 mt-auto">
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-gray-900 hover:bg-gray-800 text-white rounded-lg transition-colors"
            >
              <FiGithub />
              GitHub
            </a>
          )}
          {project.liveLink && (
            <a
              href={project.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              <FiExternalLink />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

/* ── Projects Section ────────────────────────────────────── */
const ProjectsDisplay = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
            <FiCode className="text-blue-600 text-lg" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Projects</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.name || i} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Experience Timeline ─────────────────────────────────── */
const ExperienceTimeline = ({ experience }) => {
  if (!experience || experience.length === 0) return null;
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-10">
          <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center">
            <FiBriefcase className="text-indigo-600 text-lg" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Experience</h2>
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-400 via-blue-400 to-transparent" />

          <div className="flex flex-col gap-8">
            {experience.map((exp, i) => (
              <div key={`${exp.company}-${i}`} className="relative pl-14">
                {/* Timeline dot */}
                <div className="absolute left-3 top-1.5 w-5 h-5 rounded-full bg-white border-[3px] border-indigo-500 shadow-sm" />

                <div className="bg-white rounded-xl border border-gray-100 p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1 mb-2">
                    <h3 className="text-lg font-bold text-gray-900">{exp.role}</h3>
                    {exp.duration && (
                      <span className="text-sm text-gray-400 font-medium">
                        {exp.duration}
                      </span>
                    )}
                  </div>
                  <p className="text-indigo-600 font-semibold text-sm mb-3 flex items-center gap-1.5">
                    <FiMapPin className="text-xs" />
                    {exp.company}
                  </p>
                  {exp.description && (
                    <p className="text-gray-500 text-sm leading-relaxed whitespace-pre-line">
                      {exp.description}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

/* ── Contact Section ─────────────────────────────────────── */
const CONTACT_LINKS = [
  { key: 'email', icon: FiMail, prefix: 'mailto:', label: 'Email' },
  { key: 'linkedin', icon: FiLinkedin, prefix: '', label: 'LinkedIn' },
  { key: 'github', icon: FiGithub, prefix: '', label: 'GitHub' },
  { key: 'website', icon: FiGlobe, prefix: '', label: 'Website' },
];

const ContactDisplay = ({ contact }) => {
  if (!contact) return null;
  const hasAny = Object.values(contact).some(Boolean);
  if (!hasAny) return null;

  return (
    <section className="py-16 md:py-20 bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <div className="flex items-center justify-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
            <FiMail className="text-blue-300 text-lg" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold">Get In Touch</h2>
        </div>
        <p className="text-gray-300 mb-10 max-w-lg mx-auto">
          Feel free to reach out for collaborations, opportunities, or just a friendly hello!
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          {CONTACT_LINKS.map(({ key, icon: Icon, prefix, label }) => {
            const value = contact[key];
            if (!value) return null;
            const href = key === 'email' ? `${prefix}${value}` : value;
            return (
              <a
                key={key}
                href={href}
                target={key === 'email' ? undefined : '_blank'}
                rel={key === 'email' ? undefined : 'noopener noreferrer'}
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/10 rounded-xl text-sm font-semibold transition-all duration-200 hover:scale-105"
              >
                <Icon className="text-base" />
                {key === 'email' ? value : label}
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── Footer ──────────────────────────────────────────────── */
const PortfolioFooter = ({ fullName }) => (
  <footer className="bg-slate-950 text-gray-400 text-center py-6 text-sm">
    <p>© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
    <p className="mt-1 text-gray-500 text-xs">
      Built with Developer Portfolio Generator
    </p>
  </footer>
);

/* ═══════════════════════════════════════════════════════════
   Main Layout
   ═══════════════════════════════════════════════════════════ */
const PortfolioLayout = ({ data }) => {
  if (!data) return null;

  return (
    <div className="min-h-screen bg-white">
      <HeroSection
        fullName={data.fullName}
        title={data.title}
        bio={data.bio}
        profileImage={data.profileImage}
      />
      <AboutSection bio={data.bio} />
      <SkillsDisplay skills={data.skills} />
      <ProjectsDisplay projects={data.projects} />
      <ExperienceTimeline experience={data.experience} />
      <ContactDisplay contact={data.contact} />
      <PortfolioFooter fullName={data.fullName} />
    </div>
  );
};

export default PortfolioLayout;
