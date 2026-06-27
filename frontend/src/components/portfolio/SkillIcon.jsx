import React, { useState } from 'react';
import { FiCode } from 'react-icons/fi';

const getSlug = (skill) => {
  let slug = skill.toLowerCase()
    .replace(/\+/g, 'plus')
    .replace(/#/g, 'sharp')
    .replace(/\./g, 'dot')
    .replace(/[^a-z0-9]/g, '');
  
  // Handle some common aliases
  const aliases = {
    'nodejs': 'nodedotjs',
    'vuejs': 'vuedotjs',
    'reactjs': 'react',
    'nextjs': 'nextdotjs',
    'js': 'javascript',
    'ts': 'typescript',
    'html': 'html5',
    'css': 'css3',
  };

  return aliases[slug] || slug;
};

const SkillIcon = ({ skill, className = "w-8 h-8", fallbackClassName = "text-2xl" }) => {
  const [error, setError] = useState(false);
  const slug = getSlug(skill);

  if (error || !skill.trim()) {
    return <FiCode className={fallbackClassName} />;
  }

  return (
    <img
      src={`https://cdn.simpleicons.org/${slug}`}
      alt={`${skill} logo`}
      className={className}
      onError={() => setError(true)}
    />
  );
};

export default SkillIcon;
