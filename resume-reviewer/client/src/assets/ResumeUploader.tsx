import React, { useState } from "react";
import axios from "axios";

const ResumeUploader: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile || null);
    setResumeText("");
    setError("");
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResumeText(response.data.resumeText);
    } catch (err) {
      setError("Failed to upload or parse the PDF.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "auto", textAlign: "center" }}>
      <h2>Upload Resume (PDF)</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <br />
      <br />
      <button onClick={handleUpload} disabled={loading}>
        {loading ? "Uploading..." : "Upload & Parse"}
      </button>
      <br />
      <br />
      {error && <p style={{ color: "red" }}>{error}</p>}
      {resumeText && (
        <div>
          <h3>Extracted Resume Text:</h3>
          <pre style={{ textAlign: "left", whiteSpace: "pre-wrap" }}>
            {resumeText}
          </pre>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
