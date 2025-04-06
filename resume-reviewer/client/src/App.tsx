import { useState } from "react";
import axios from "axios";
import { FaSpinner } from "react-icons/fa";

function App() {
  const [file, setFile] = useState<File | null>(null);
  const [resumeText, setResumeText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null);
  };

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true); // Start loading

    try {
      const res = await axios.post(
        "http://localhost:5000/api/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResumeText(res.data.resumeText);
    } catch (err) {
      console.error(err);
      setResumeText("Failed to upload or parse resume.");
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">
          Upload Your Resume
        </h1>
        <input
          type="file"
          onChange={handleFileChange}
          className="mb-4 w-full"
        />
        <button
          onClick={handleUpload}
          className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>

        {loading && (
          <div className="flex justify-center mt-4">
            <FaSpinner className="animate-spin text-blue-600 text-4xl" />
          </div>
        )}

        {resumeText && !loading && (
          <div className="mt-6">
            <h2 className="font-semibold mb-2">Extracted Text:</h2>
            <pre className="bg-gray-200 p-2 rounded text-sm max-h-60 overflow-y-auto">
              {resumeText}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
