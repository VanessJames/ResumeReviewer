import { useState } from "react";
import axios from "axios";

function ResumeUploader() {
  const [file, setFile] = useState<File | null>(null);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setResponse(res.data.resumeText);
    } catch (error) {
      console.error(error);
      setResponse("Upload failed.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-xl rounded-xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">
          Upload Your Resume
        </h1>
        <input
          type="file"
          accept=".pdf"
          onChange={handleFileChange}
          className="mb-4 w-full border rounded p-2"
        />
        <button
          onClick={handleUpload}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full"
        >
          Upload and Analyze
        </button>

        {response && (
          <div className="mt-6">
            <h2 className="font-semibold text-lg mb-2">Extracted Text:</h2>
            <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto max-h-64">
              {response}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ResumeUploader;
