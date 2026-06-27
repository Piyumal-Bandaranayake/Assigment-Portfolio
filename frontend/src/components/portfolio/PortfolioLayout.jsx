import React from 'react';
import {
  FiGithub,
  FiExternalLink,
  FiMail,
  FiLinkedin,
  FiGlobe,
  FiCode,
  FiBriefcase,
  FiMapPin
} from 'react-icons/fi';
import SkillIcon from './SkillIcon';

/* ── Hero Section ────────────────────────────────────────── */
const HeroSection = ({ fullName, title, bio, profileImage, contact }) => (
  <section className="relative bg-blue-50/70 py-20 min-h-[90vh] flex items-center overflow-hidden border-b border-white/20">
    {/* Decorative blur elements */}
    <div className="absolute -top-32 -left-32 w-[600px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] pointer-events-none" />
    <div className="absolute -bottom-32 -right-32 w-[600px] h-[600px] bg-indigo-400/20 rounded-full blur-[120px] pointer-events-none" />
    
    <div className="relative max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-10 items-center w-full z-10">
      {/* Left text */}
      <div className="text-center md:text-left order-2 md:order-1">
        <p className="text-blue-700 font-bold mb-3 tracking-widest uppercase text-xl md:text-2xl drop-shadow-sm">Hi I am</p>
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-900 mb-3 tracking-tight drop-shadow-md">{fullName}</h1>
        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-6 drop-shadow-sm">{title}</h2>
        <p className="text-slate-800 font-medium mb-8 max-w-md mx-auto md:mx-0 leading-relaxed text-base bg-white/70 p-4 rounded-2xl backdrop-blur-sm border border-white/40 shadow-sm">
          {bio}
        </p>
        
        {/* Contact Actions */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 mb-8">
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-full transition-all shadow-lg shadow-blue-300 hover:scale-105">
              Hire Me
            </a>
          )}
          {contact?.website && (
            <a href={contact.website} target="_blank" rel="noopener noreferrer" className="bg-white/80 backdrop-blur-md border-2 border-blue-300 hover:border-blue-500 text-blue-900 font-semibold py-2.5 px-8 rounded-full transition-all shadow-md hover:bg-white hover:scale-105">
              Portfolio
            </a>
          )}
        </div>

        {/* Social Icons */}
        <div className="flex items-center justify-center md:justify-start gap-4">
          {contact?.linkedin && (
            <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-blue-800 hover:bg-blue-600 hover:text-white transition-all hover:scale-110">
              <FiLinkedin className="text-xl" />
            </a>
          )}
          {contact?.github && (
            <a href={contact.github} target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-slate-800 hover:bg-slate-900 hover:text-white transition-all hover:scale-110">
              <FiGithub className="text-xl" />
            </a>
          )}
          {contact?.email && (
            <a href={`mailto:${contact.email}`} className="w-12 h-12 rounded-full bg-white/80 backdrop-blur-md shadow-md flex items-center justify-center text-blue-700 hover:bg-red-500 hover:text-white transition-all hover:scale-110">
              <FiMail className="text-xl" />
            </a>
          )}
        </div>
      </div>
      
      {/* Right image */}
      <div className="relative flex justify-center order-1 md:order-2">
        <div className="relative w-64 h-80 md:w-80 md:h-96 mx-auto mt-10 md:mt-0">
          {/* Outlines */}
          <div className="absolute inset-0 border-4 border-blue-500/80 rounded-[40px] transform rotate-6 scale-105 transition-transform duration-500 hover:rotate-12 backdrop-blur-sm"></div>
          <div className="absolute inset-0 border-4 border-slate-700/80 rounded-[40px] transform -rotate-3 scale-105 transition-transform duration-500 hover:-rotate-6 backdrop-blur-sm"></div>
          {/* Image container */}
          <div className="absolute inset-0 rounded-[40px] overflow-hidden bg-white/90 shadow-2xl z-10 border-4 border-white/80 backdrop-blur-md">
            {profileImage?.url ? (
              <img src={profileImage.url} alt={fullName} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-blue-400 font-medium">No Image</div>
            )}
          </div>
        </div>
      </div>
    </div>
  </section>
);

/* ── About Section ───────────────────────────────────────── */
const AboutSection = ({ bio, profileImage, experience, projects }) => {
  if (!bio) return null;
  return (
    <section className="bg-white/80 py-24 border-t border-white/30">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center mb-16 text-slate-900 drop-shadow-sm">About Me</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
           {/* Left Image */}
           <div className="relative w-56 h-72 mx-auto hidden md:block">
              {/* Outlines */}
              <div className="absolute inset-0 border-4 border-blue-500/70 rounded-[30px] transform -rotate-6 scale-105 backdrop-blur-sm"></div>
              <div className="absolute inset-0 border-4 border-slate-700/70 rounded-[30px] transform rotate-3 scale-105 backdrop-blur-sm"></div>
              {/* Image */}
              <div className="absolute inset-0 rounded-[30px] overflow-hidden bg-white/90 shadow-xl z-10 border-4 border-white/80">
                {profileImage?.url ? (
                  <img src={profileImage.url} alt="Profile" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-blue-100/50"></div>
                )}
              </div>
           </div>

           {/* Right Content */}
           <div className="flex flex-col justify-center">
              <div className="flex gap-4 mb-8">
                 <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 flex-1 text-center hover:-translate-y-1 transition-transform">
                    <h3 className="font-bold text-slate-700 mb-1">Experience</h3>
                    <p className="text-blue-700 font-extrabold text-3xl">{experience?.length || 0} Roles</p>
                 </div>
                 <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-6 border border-white/50 flex-1 text-center hover:-translate-y-1 transition-transform">
                    <h3 className="font-bold text-slate-700 mb-1">Projects</h3>
                    <p className="text-blue-700 font-extrabold text-3xl">{projects?.length || 0} Built</p>
                 </div>
              </div>
              
              <div className="bg-white/80 backdrop-blur-md rounded-2xl shadow-lg p-8 border border-white/50 text-slate-800 font-medium text-base leading-relaxed whitespace-pre-line">
                 {bio}
              </div>
           </div>
        </div>
      </div>
    </section>
  );
};

/* ── Skills Section (Mapped to "Services" UI) ────────────── */
const SkillsDisplay = ({ skills }) => {
  if (!skills || skills.length === 0) return null;
  return (
    <section className="bg-blue-100/80 py-24 border-t border-white/20">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 drop-shadow-sm">Skills</h2>
        <p className="text-slate-800 font-medium max-w-2xl mx-auto mb-16 text-base bg-white/60 inline-block px-6 py-2 rounded-full border border-white/30 backdrop-blur-sm">
          A showcase of the tools and technologies I use.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => (
            <div key={skill} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg hover:shadow-blue-300/50 hover:border-blue-300 p-6 border border-white/60 flex flex-col items-center justify-center transition-all duration-300 hover:-translate-y-1.5 hover:scale-105">
              <div className="w-16 h-16 bg-blue-100/80 text-blue-700 rounded-xl flex items-center justify-center mb-4 border border-blue-200 shadow-inner p-3 overflow-hidden">
                <SkillIcon skill={skill} className="w-full h-full object-contain" fallbackClassName="text-3xl" />
              </div>
              <h3 className="font-extrabold text-slate-800 text-sm text-center uppercase tracking-wide">{skill}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

/* ── Projects Section ────────────────────────────────────── */
const ProjectsDisplay = ({ projects }) => {
  if (!projects || projects.length === 0) return null;
  return (
    <section className="bg-white/80 py-24 border-t border-white/30">
      <div className="max-w-6xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 mb-4 drop-shadow-sm">My Projects</h2>
        <p className="text-slate-800 font-medium max-w-2xl mx-auto mb-16 text-base bg-white/60 inline-block px-6 py-2 rounded-full border border-white/30 backdrop-blur-sm">
          A selection of my recent work and technical achievements.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, i) => {
            const techList =
              typeof project.techStack === 'string'
                ? project.techStack.split(',').map((s) => s.trim()).filter(Boolean)
                : Array.isArray(project.techStack)
                ? project.techStack
                : [];

            return (
              <div key={project.name || i} className="bg-white/90 backdrop-blur-md rounded-3xl p-5 text-left shadow-xl border border-white/60 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-300/40 hover:-translate-y-1 flex flex-col">
                {project.image?.url ? (
                  <div className="w-full h-56 rounded-2xl overflow-hidden mb-5 bg-blue-50/50 border border-white/50 shadow-inner">
                    <img src={project.image.url} alt={project.name} className="w-full h-full object-cover hover:scale-110 transition-transform duration-700" />
                  </div>
                ) : (
                  <div className="w-full h-56 rounded-2xl overflow-hidden mb-5 bg-blue-50/50 border border-white/50 flex items-center justify-center shadow-inner">
                    <FiCode className="text-5xl text-blue-300" />
                  </div>
                )}
                
                <h3 className="text-xs font-bold text-blue-600 mb-1 tracking-widest uppercase">Project</h3>
                <h4 className="text-2xl font-extrabold text-slate-900 mb-3">{project.name}</h4>
                <p className="text-slate-700 font-medium text-sm mb-5 line-clamp-3 flex-1">{project.description}</p>
                
                {techList.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {techList.slice(0, 4).map((tech) => (
                      <span key={tech} className="px-2.5 py-1 text-[11px] font-bold bg-blue-100/60 border border-blue-200/50 text-blue-800 rounded-lg backdrop-blur-sm">
                        {tech}
                      </span>
                    ))}
                    {techList.length > 4 && (
                      <span className="px-2.5 py-1 text-[11px] font-bold bg-gray-200/60 border border-gray-300/50 text-slate-600 rounded-lg backdrop-blur-sm">
                        +{techList.length - 4}
                      </span>
                    )}
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-auto">
                  {project.liveLink && (
                    <a href={project.liveLink} target="_blank" rel="noopener noreferrer" className="text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-xl transition-colors text-center flex-1 shadow-md hover:shadow-lg">
                      Live Demo
                    </a>
                  )}
                  {project.githubLink && (
                    <a href={project.githubLink} target="_blank" rel="noopener noreferrer" className="text-sm font-bold bg-slate-800 hover:bg-slate-900 text-white px-4 py-3 rounded-xl transition-colors text-center flex-1 shadow-md hover:shadow-lg">
                      GitHub
                    </a>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

/* ── Experience Section ──────────────────────────────────── */
const ExperienceTimeline = ({ experience }) => {
  if (!experience || experience.length === 0) return null;
  return (
    <section className="bg-blue-100/80 py-24 border-t border-white/20">
      <div className="max-w-4xl mx-auto px-6">
        <h2 className="text-3xl md:text-5xl font-extrabold text-center text-slate-900 mb-16 drop-shadow-sm">Experience</h2>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <div key={`${exp.company}-${i}`} className="bg-white/90 backdrop-blur-md rounded-2xl shadow-lg border border-white/60 p-6 sm:p-8 hover:shadow-xl hover:border-blue-300 transition-all hover:-translate-y-1">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-2">
                <h3 className="text-2xl font-extrabold text-slate-900">{exp.role}</h3>
                {exp.duration && (
                  <span className="inline-block bg-blue-100/80 border border-blue-200 text-blue-800 text-xs font-bold px-4 py-1.5 rounded-full whitespace-nowrap shadow-sm">
                    {exp.duration}
                  </span>
                )}
              </div>
              <p className="text-blue-700 font-bold text-base mb-4 flex items-center gap-2">
                <FiMapPin className="text-blue-500 text-lg" />
                {exp.company}
              </p>
              {exp.description && (
                <p className="text-slate-700 font-medium text-sm leading-relaxed whitespace-pre-line">
                  {exp.description}
                </p>
              )}
            </div>
          ))}
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
    <section className="bg-blue-900/90 py-24 border-t border-blue-800/50 text-white relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-400/20 rounded-full blur-[80px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-400/20 rounded-full blur-[80px] pointer-events-none" />
      
      <div className="relative max-w-4xl mx-auto px-6 text-center z-10">
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6 drop-shadow-md">Contact Me</h2>
        <p className="text-blue-100 mb-12 max-w-lg mx-auto text-base font-medium leading-relaxed bg-white/10 p-4 rounded-2xl backdrop-blur-md border border-white/10">
          Feel free to reach out for collaborations, opportunities, or just a friendly hello! I'm always open to discussing new projects.
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
                className="inline-flex items-center gap-2 px-6 py-4 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-base font-bold text-white transition-all duration-300 hover:scale-105 hover:shadow-lg shadow-sm"
              >
                <Icon className="text-xl" />
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
  <footer className="bg-slate-950/95 text-blue-200/60 text-center py-10 text-sm border-t border-slate-900/50">
    <p className="font-bold text-blue-100 text-base mb-2">© {new Date().getFullYear()} {fullName}. All rights reserved.</p>
    <p className="text-xs font-medium tracking-wide">
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
    <div 
      className="min-h-screen font-sans text-gray-900 selection:bg-blue-300 selection:text-blue-900 bg-cover bg-center bg-fixed bg-no-repeat"
      style={{ backgroundImage: "url('/back.jpg')" }}
    >
      <HeroSection
        fullName={data.fullName}
        title={data.title}
        bio={data.bio}
        profileImage={data.profileImage}
        contact={data.contact}
      />
      <AboutSection 
        bio={data.bio} 
        profileImage={data.profileImage} 
        experience={data.experience} 
        projects={data.projects} 
      />
      <SkillsDisplay skills={data.skills} />
      <ProjectsDisplay projects={data.projects} />
      <ExperienceTimeline experience={data.experience} />
      <ContactDisplay contact={data.contact} />
      <PortfolioFooter fullName={data.fullName} />
    </div>
  );
};

export default PortfolioLayout;
