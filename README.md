# Welcome to React Router!
    


    Build an AI-powered Resume Analyzer with React, React Router, and Puter.js! Create job listings, upload candidate resumes, and use AI to automatically evaluate and match resumes to job requirements.

A modern, production-ready template for building full-stack React applications using React Router.

## Features

- 🚀 Server-side rendering
- ⚡️ Hot Module Replacement (HMR)
- 📦 Asset bundling and optimization
- 🔄 Data loading and mutations
- 🔒 TypeScript by default
- 🎉 TailwindCSS for styling
- 📖 [React Router docs](https://reactrouter.com/)


## Puter Js

What is Puter.js?

Puter.js is a JavaScript library/SDK that lets you do backend stuff right from the frontend browser code — with literally zero backend servers, no API keys, no backend config. It’s kind of like giving your frontend magical superpowers without needing a traditional backend. 
 

It claims to give you:

Cloud Storage (save files directly from JS)

Databases & Key‑Value stores

Authentication

AI access (Claude, GPT, Gemini, etc.)

Hosting & publishing pages

OCR, networking, text‑to‑speech, and more

All from a single <script> tag or npm package
(no server code needed)


## Deployment

### Docker Deployment

To build and run using Docker:

```bash
docker build -t my-app .

# Run the container
docker run -p 3000:3000 my-app
```

The containerized application can be deployed to any platform that supports Docker, including:

- AWS ECS
- Google Cloud Run
- Azure Container Apps
- Digital Ocean App Platform
- Fly.io
- Railway

### DIY Deployment

If you're familiar with deploying Node applications, the built-in app server is production-ready.

Make sure to deploy the output of `npm run build`

```
├── package.json
├── package-lock.json (or pnpm-lock.yaml, or bun.lockb)
├── build/
│   ├── client/    # Static assets
│   └── server/    # Server-side code
```
