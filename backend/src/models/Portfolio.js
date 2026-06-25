const mongoose = require('mongoose');

// Project sub-schema
const projectSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Project name is required'],
    trim: true,
  },
  description: {
    type: String,
    trim: true,
  },
  // Cloudinary image object for project thumbnail
  image: {
    publicId: { type: String, default: '' },
    url: { type: String, default: '' },
  },
  techStack: [{ type: String, trim: true }],
  githubLink: { type: String, trim: true },
  liveDemo: { type: String, trim: true },
});

// Experience sub-schema
const experienceSchema = new mongoose.Schema({
  company: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
  },
  role: {
    type: String,
    required: [true, 'Role/position is required'],
    trim: true,
  },
  duration: { type: String, trim: true },
  description: { type: String, trim: true },
});

// Portfolio schema
const portfolioSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    username: {
      type: String,
      required: [true, 'Username is required'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_-]+$/,
        'Username can only contain alphanumeric characters, underscores, and hyphens',
      ],
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    title: {
      type: String,
      required: [true, 'Professional title is required'],
      trim: true,
    },
    bio: { type: String, trim: true },

    // Profile image stored as Cloudinary object { publicId, url }
    profileImage: {
      publicId: { type: String, default: '' },
      url: { type: String, default: '' },
    },

    contact: {
      email: { type: String, trim: true, lowercase: true },
      linkedin: { type: String, trim: true },
      github: { type: String, trim: true },
      website: { type: String, trim: true },
    },
    skills: [{ type: String, trim: true }],
    projects: [projectSchema],
    experience: [experienceSchema],
  },
  { timestamps: true }
);

const Portfolio = mongoose.model('Portfolio', portfolioSchema);
module.exports = Portfolio;
