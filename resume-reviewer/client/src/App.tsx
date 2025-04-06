import React, { useState } from "react";
import Spinner from "./components/Spinner";

const App: React.FC = () => {
  const [resume, setResume] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<{
    matchPercentage: number;
    strengths: string[];
    weaknesses: string[];
    suggestions: string;
  } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!resume || !jobDescription) {
      setError("Please upload a resume and provide a job description.");
      return;
    }

    setLoading(true);
    setError("");
    setResult(null);

    const formData = new FormData();
    formData.append("resume", resume);
    formData.append("jobDescription", jobDescription);

    try {
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) throw new Error(data.error || "Something went wrong");

      setResult(data);
      setResume(null);
      setJobDescription("");
    } catch (err: any) {
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Resume Reviewer</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setResume(e.target.files?.[0] || null)}
            className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-blue-600 file:text-white hover:file:bg-blue-700"
          />
          <textarea
            placeholder="Paste the job description here..."
            className="w-full h-32 p-3 border rounded-md resize-none"
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-md transition-colors"
          >
            {loading ? <Spinner /> : "Upload and Analyze"}
          </button>
        </form>

        {error && <p className="text-red-600 font-semibold text-sm">{error}</p>}

        {result && (
          <div className="space-y-3 text-sm">
            <h2 className="text-lg font-bold text-green-700">
              Match: {result.matchPercentage}%
            </h2>
            <div>
              <p className="font-semibold">Strengths:</p>
              <ul className="list-disc ml-6">
                {result.strengths.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Weaknesses:</p>
              <ul className="list-disc ml-6">
                {result.weaknesses.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>
            <div>
              <p className="font-semibold">Suggestions:</p>
              <p>{result.suggestions}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
