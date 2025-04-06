import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file || !jobDescription) {
      alert("Please upload a resume and enter a job description.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);
    formData.append("jobDescription", jobDescription);

    setLoading(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/analyze",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      setResult(response.data.feedback || "No feedback received.");
    } catch (error) {
      console.error(error);
      setResult("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-md w-full max-w-md space-y-4"
      >
        <h1 className="text-xl font-bold">Resume Analyzer</h1>

        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-600"
        />

        <textarea
          placeholder="Paste the job description here..."
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full border p-2 rounded h-40"
          required
        />

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          {loading ? "Analyzing..." : "Upload & Analyze"}
        </button>

        {loading && <div className="mt-4 text-blue-600">⏳ Analyzing...</div>}
        {result && (
          <div className="mt-4 p-3 bg-gray-100 rounded border border-gray-300">
            <strong>Feedback:</strong>
            <p>{result}</p>
          </div>
        )}
      </form>
    </div>
  );
}

export default App;
