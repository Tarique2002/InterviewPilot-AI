import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Resume() {
  const [file, setFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const uploadResume = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);

    try {
      const res = await axios.post(
        "http://127.0.0.1:8000/upload-resume",
        formData
      );

      setSkills(res.data.skills_detected);
      setMessage("Resume analyzed successfully");

    } catch (err) {
      console.log(err);
      setMessage("Upload failed");
    }

    setLoading(false);
  };

  const startInterview = () => {
    navigate("/interview");
  };

  return (
    <div>
      <h1 className="text-3xl font-bold">📄 Resume Analyzer</h1>

      <div className="mt-6 p-6 rounded-2xl bg-white/5 border border-white/10">

        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button
          onClick={uploadResume}
          className="mt-4 px-6 py-2 bg-white text-black rounded-xl"
        >
          {loading ? "Analyzing..." : "Upload Resume"}
        </button>

        {message && (
          <p className="mt-4 text-green-400">{message}</p>
        )}

        {/* Skills Display */}
        {skills.length > 0 && (
          <div className="mt-6">
            <h2 className="text-lg font-semibold">Detected Skills:</h2>

            <div className="flex gap-2 mt-2 flex-wrap">
              {skills.map((skill, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-white/10 rounded-full text-sm"
                >
                  {skill}
                </span>
              ))}
            </div>

            <button
              onClick={startInterview}
              className="mt-6 px-6 py-2 bg-green-500 text-black rounded-xl font-semibold"
            >
              Start Interview →
            </button>
          </div>
        )}

      </div>
    </div>
  );
}