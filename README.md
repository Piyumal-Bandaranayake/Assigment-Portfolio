# Developer Portfolio Generator

A full-stack web application built on the MERN stack that allows developers to generate their own portfolio website by filling out a simple, intuitive form. The platform saves the data and automatically creates a shareable, public portfolio page with a unique URL.

## 🚀 Features

- **User Authentication:** Secure JWT-based login and registration.
- **Dynamic Portfolio Generation:** Build and customize a personal portfolio.
- **Live Preview:** See how the portfolio looks before publishing.
- **Shareable Links:** Every portfolio gets a unique public URL (`/portfolio/:username`).
- **Cloudinary Integration:** Image uploads for profile pictures and project thumbnails.
- **Responsive Design:** Fully mobile-friendly UI built with Tailwind CSS.

## 🛠️ Tech Stack

**Frontend:**
- React.js
- React Router
- Tailwind CSS
- Axios
- Vite

**Backend:**
- Node.js
- Express.js
- MongoDB & Mongoose (ODM)
- JSON Web Tokens (JWT) for authentication
- Cloudinary (for image hosting)

## ⚙️ Environment Variables

To run this project, you will need to add the following environment variables.

### Backend (`backend/.env`)

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
NODE_ENV=development
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### Frontend (`frontend/.env`)

```env
VITE_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
VITE_CLOUDINARY_UPLOAD_PRESET=your_cloudinary_unsigned_preset
```

## 💻 Setup Instructions

To get a local copy up and running, follow these steps.

### 1. Clone the repository
```bash
git clone <your-repo-link>
cd Protfolio
```

### 2. Install Dependencies

You will need to install dependencies for both the frontend and the backend.

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 3. Setup Environment Variables
Create a `.env` file in both the `backend` and `frontend` directories based on the templates shown above.

### 4. Run the Application locally

**Option A (Separate Terminals):**

Open two separate terminals:
```bash
# Terminal 1 (Backend)
cd backend
npm run dev

# Terminal 2 (Frontend)
cd frontend
npm run dev
```

**Option B (Single Command using Concurrently - Optional):**
If you wish to run both with a single command from the root directory, create a `package.json` in the root and add:
```json
{
  "name": "portfolio-generator",
  "scripts": {
    "dev": "concurrently \"cd backend && npm run dev\" \"cd frontend && npm run dev\""
  },
  "devDependencies": {
    "concurrently": "^8.0.0"
  }
}
```
Then simply run `npm install` and `npm run dev` from the root folder.

## 📸 Screenshots

*(Replace these placeholders with actual screenshots of your application before submitting)*

- **Home Page:** `![Home Page](./screenshots/home.png)`
- **Create Portfolio / Edit:** `![Create Portfolio](./screenshots/create.png)`
- **Public Portfolio View:** `![Public Portfolio](./screenshots/public.png)`

## 👨‍💻 Submission Notes
- **Loom Video:** (Insert link to 2-3 min video walkthrough here)
- **Live Demo:** (Optional link if deployed)
