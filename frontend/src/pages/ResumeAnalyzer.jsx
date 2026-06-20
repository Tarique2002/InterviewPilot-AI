import { useState } from "react";
import axios from "axios";
import API from "../api";

export default function ResumeAnalyzer() {

    const [file, setFile] = useState(null);
    const [message, setMessage] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [loading, setLoading] = useState(false);


    const uploadResume = async () => {

        if (!file) {

            alert("Please Select Resume");
            return;

        }


        setLoading(true);
        setAnalysis("");
        setMessage("");



        const formData = new FormData();

        formData.append("file", file);



        try {


            const uploadRes = await axios.post(

                `${API}/upload-resume`,

                formData,

                {

                    headers: {

                        "Content-Type": "multipart/form-data"

                    }

                }

            );



            setMessage(

                `✅ Resume Uploaded Successfully (${uploadRes.data.length} characters extracted)`

            );





            const analysisRes = await axios.get(

                `${API}/resume-analysis`

            );




            setAnalysis(

                analysisRes.data.analysis

            );


        }


        catch (error) {


            console.log(error);


            setMessage(

                "❌ Upload Failed"

            );

        }


        setLoading(false);

    };






    return (


        <div>


            <h1 className="text-4xl font-bold mb-2">

                📄 Resume Analyzer

            </h1>



            <p className="text-gray-400 mb-8">

                Upload PDF or DOCX Resume

            </p>





            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-5xl">


                <p className="text-gray-300 mb-6">

                    Upload your resume and receive ATS-style AI feedback.

                </p>





                <input

                    type="file"

                    accept=".pdf,.docx"


                    onChange={(e) =>

                        setFile(

                            e.target.files[0]

                        )

                    }


                    className="mb-6 block"

                />






                <button


                    onClick={uploadResume}



                    className="bg-cyan-500 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition"


                >


                    Analyze Resume


                </button>






                {


                    message && (


                        <div className="mt-6 bg-green-500/10 border border-green-500/20 rounded-xl p-4">


                            {message}


                        </div>


                    )

                }







                {


                    loading && (


                        <div className="mt-6">


                            🤖 Analyzing Resume...


                        </div>


                    )

                }






                {


                    analysis && (


                        <div className="mt-8 bg-black border border-white/10 rounded-2xl p-6 whitespace-pre-wrap">


                            {analysis}


                        </div>


                    )


                }




            </div>


        </div>


    );

}