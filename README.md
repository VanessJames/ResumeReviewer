# 🧠 AI Resume Reviewer

An intelligent resume reviewer web app powered by AI that analyzes how well a candidate's resume matches a job description. It supports both **User mode** (detailed feedback) and **Recruiter mode** (qualified/not qualified with reason).

---

## 🚀 Features

- 📤 Upload PDF Resumes
- 📄 Paste Job Descriptions
- 🧑‍💼 **User Mode**: Returns match %, strengths, weaknesses, and suggestions
- 🕵️‍♀️ **Recruiter Mode**: Determines if the applicant is qualified and gives a reason
- 💬 Uses Hugging Face’s text-generation models
- ⚙️ Backend powered by Node.js + Express
- 💅 Frontend built with React + TypeScript + TailwindCSS
- 🔄 Seamless toggle between User and Recruiter modes

---

## 📁 Project Structure

```
resume-reviewer/
├── README.md
├── client/
│   ├── README.md
│   ├── eslint.config.js
│   ├── index.html
│   ├── package-lock.json
│   ├── package.json
│   ├── postcss.config.js
│   ├── public/
│   ├── src/
│   │   ├── App.css
│   │   ├── App.tsx
│   │   ├── components/
│   │   │   └── Spinner.tsx
│   │   ├── index.css
│   │   ├── main.tsx
│   │   └── vite-env.d.ts
│   ├── tailwind.config.js
│   ├── tsconfig.app.json
│   ├── tsconfig.json
│   ├── tsconfig.node.json
│   └── vite.config.ts
└── server/
    ├── package-lock.json
    ├── package.json
    ├── src/
    │   ├── analysis.ts
    │   ├── parser.ts
    │   ├── routes/
    │   │   └── analyze.ts
    │   ├── server.ts
    │   └── utils.ts
    └── tsconfig.json
```

## ⚙️ Setup Instructions

### 🧱 Prerequisites

- Node.js (v18+)
- npm or yarn
- Hugging Face account + access token
- React and TailwindCSS (already included)

---

### 📦 Backend Setup (`/backend`)

1. **Navigate to backend folder:**

```bash
cd backend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Create `.env` file with your Hugging Face credentials:**

```
HUGGINGFACE_API_KEY=your_huggingface_token_here
HUGGINGFACE_ENDPOINT=https://api-inference.huggingface.co/models/<your-model-name>
```

> ✅ Recommended model: `mistralai/Mistral-7B-Instruct-v0.1` or any other text generation model that accepts prompts.

4. **Start the server:**

```bash
npx tsx server.ts
```

Server will run at `http://localhost:5000`

---

### 🎨 Frontend Setup (`/frontend`)

1. **Navigate to frontend folder:**

```bash
cd frontend
```

2. **Install dependencies:**

```bash
npm install
```

3. **Start the React app:**

```bash
npm run dev
```

App will run at `http://localhost:5173` or similar.

---

## 🧪 Usage

1. Launch both frontend and backend
2. In the browser:
   - Upload a **PDF resume**
   - Paste a **job description**
   - Select **User** or **Recruiter** mode
   - Click **Upload and Analyze**
3. See intelligent feedback based on the selected mode:
   - ✅ **User**: Gets percentage match, strengths, weaknesses, and suggestions
   - ✅ **Recruiter**: Gets a "Qualified" / "Not Qualified" label and a reason

---


## 📦 Example API Response

### User Mode

```json
{
  "matchPercentage": 84,
  "strengths": ["Strong Python experience", "Leadership roles in past jobs"],
  "weaknesses": ["No AWS certification"],
  "suggestions": ["Include AWS-related projects", "Mention cloud experience more"]
}
```

### Recruiter Mode

```json
{
  "qualified": true,
  "reason": "The candidate has 5+ years of relevant experience and matches all major job requirements."
}
```

---

## 📌 Environment Variables Reference

| Variable              | Description                             |
|-----------------------|-----------------------------------------|
| `HUGGINGFACE_API_KEY` | Your Hugging Face access token          |
| `HUGGINGFACE_ENDPOINT`| API endpoint for the model you're using |

---

## 🛠️ Tech Stack

| Layer      | Tech                            |
|------------|----------------------------------|
| Frontend   | React, TypeScript, Tailwind CSS |
| Backend    | Node.js, Express, Multer        |
| PDF Parser | `pdf-parse`                     |
| AI/NLP     | Hugging Face API                |

---

## 🧠 Future Improvements

- Support for `.docx` or `.txt` resumes
- Login and saved history
- Fine-tuned LLMs for better accuracy
- Streaming for real-time feedback

---

## 🧑‍💻 Author

**Vaness James**

> If you're reading this on GitHub, feel free to fork, star, or contribute!

---

## 📃 License

MIT License – feel free to use, modify, and distribute.

---
