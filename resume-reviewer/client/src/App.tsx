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
    suggestions: string[] | string;
    qualified?: boolean;
    reason?: string;
  } | null>(null);
  const [mode, setMode] = useState<"user" | "recruiter">("user");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if resume and job description are provided
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
    formData.append("mode", mode);

    try {
      console.log("Sending request...");
      const response = await fetch("http://localhost:5000/api/analyze", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "Something went wrong with the API."
        );
      }

      const data = await response.json();
      console.log("Received response:", data);

      // If there is no response or result, set an error
      if (!data) {
        throw new Error("No data received from the API.");
      }

      setResult(data); // This triggers a re-render
      setResume(null);
      setJobDescription("");
    } catch (err: any) {
      console.error("Error:", err);
      setError(err.message || "Failed to analyze resume.");
    } finally {
      setLoading(false);
    }
  };

  const handleModeChange = (newMode: "user" | "recruiter") => {
    setMode(newMode);
    setResult(null); // clear previous results
    setError(""); // clear errors
    setResume(null); // clear the resume when mode changes
    setJobDescription(""); // clear the job description when mode changes
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-center">Resume Reviewer</h1>

        {/* Mode Toggle */}
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleModeChange("user")}
            className={`px-4 py-2 rounded-md font-semibold ${
              mode === "user" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            User
          </button>
          <button
            onClick={() => handleModeChange("recruiter")}
            className={`px-4 py-2 rounded-md font-semibold ${
              mode === "recruiter" ? "bg-blue-600 text-white" : "bg-gray-200"
            }`}
          >
            Recruiter
          </button>
        </div>

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
          <div className="space-y-3 text-sm animate-fade-in">
            {mode === "user" && result.matchPercentage !== undefined && (
              <>
                <h2
                  className={`text-lg font-bold ${
                    result.matchPercentage >= 75
                      ? "text-green-600"
                      : result.matchPercentage >= 50
                      ? "text-yellow-600"
                      : "text-red-600"
                  }`}
                >
                  Match: {result.matchPercentage}%
                </h2>
                <div>
                  <h3 className="font-semibold">Strengths:</h3>
                  <ul>
                    {result.strengths.map((strength, idx) => (
                      <li key={idx}>{strength}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Weaknesses:</h3>
                  <ul>
                    {result.weaknesses.map((weakness, idx) => (
                      <li key={idx}>{weakness}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold">Suggestions:</h3>
                  <ul>
                    {typeof result.suggestions === "string" ? (
                      <li>{result.suggestions}</li>
                    ) : (
                      result.suggestions.map((suggestion, idx) => (
                        <li key={idx}>{suggestion}</li>
                      ))
                    )}
                  </ul>
                </div>
              </>
            )}

            {mode === "recruiter" && result.qualified !== undefined && (
              <>
                <h2
                  className={`text-lg font-bold ${
                    result.qualified ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {result.qualified ? "Qualified" : "Not Qualified"}
                </h2>
                <p className="font-semibold">Reason:</p>
                <p>{result.reason}</p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;
