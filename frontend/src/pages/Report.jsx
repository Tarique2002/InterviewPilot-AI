import { useEffect, useState } from "react";
import axios from "axios";
import API from "../api";

export default function Report() {
  const [report, setReport] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadReport();
  }, []);

  const loadReport = async () => {
    try {
      const res = await axios.get(
        `${API}/final-report`
      );

      setReport(res.data.report);
    } catch (error) {
      console.error(error);

      setReport(
        "Unable to generate report. Complete an interview first."
      );
    }

    setLoading(false);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        📊 AI Performance Report
      </h1>

      {loading ? (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="text-xl font-semibold">
            Generating AI Report...
          </h2>

          <p className="text-gray-400 mt-2">
            Gemma3 is analyzing interview performance.
          </p>
        </div>
      ) : (
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <pre className="whitespace-pre-wrap text-sm leading-7">
            {report}
          </pre>
        </div>
      )}
    </div>
  );
}