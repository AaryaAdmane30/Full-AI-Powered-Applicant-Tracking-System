import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import FileUploader from "~/components/FileUploader";
import Navbar from "~/components/Navbar";
import { usePuterStore } from "~/lib/puter";
import { convertPdfToImage } from "~/lib/Pdf2img";
import { generateUUID } from "~/lib/utils"; // ✅ Import the UUID generator

type AnalyzePayload = {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  file: File;
};

const Upload: React.FC = () => {
  const { auth, fs, kv } = usePuterStore();
  const navigate = useNavigate();

  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState("");
  const [file, setFile] = useState<File | null>(null);

  const [companyName, setCompanyName] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  // Redirect to login if not signed in
  useEffect(() => {
    const checkAuth = async () => {
      if (!auth) return;
      const signedIn = await auth.checkAuthStatus();
      if (!signedIn) {
        navigate("/auth?next=/upload");
      }
    };
    checkAuth();
  }, [auth, navigate]);

  // Upload + convert PDF to image + save metadata
  const handleAnalyze = async ({ companyName, jobTitle, jobDescription, file }: AnalyzePayload) => {
    try {
      setStatusText("Converting PDF to image...");
      const imageBlob = await convertPdfToImage(file);

      // UUIDs are universally unique, so even if multiple users upload at the exact same millisecond, each file gets its own unique identifier.

      const uuid = generateUUID(); // Generate UUID for file naming
      const pdfPath = `/resumes/${uuid}-${file.name}`;
      const imagePath = `/resumes/images/${uuid}-${file.name}.png`;

      setStatusText("Saving files...");
      await fs.write(pdfPath, file);
      await fs.write(imagePath, imageBlob);

      setStatusText("Saving metadata...");
      await kv.set(pdfPath, JSON.stringify({
        companyName,
        jobTitle,
        jobDescription,
        filePath: pdfPath,
        imagePath,
        uploadedAt: new Date().toISOString(),
      }));

      setStatusText("Upload complete! Redirecting...");
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      throw new Error("Failed to process the resume.");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!file) return alert("Please upload a resume first");
    if (!companyName || !jobTitle || !jobDescription) return alert("Please fill in all fields");

    setIsProcessing(true);
    setStatusText("Uploading and analyzing your resume...");

    try {
      await handleAnalyze({ companyName, jobTitle, jobDescription, file });
    } catch (err) {
      alert((err as Error).message || "Something went wrong during upload.");
      setIsProcessing(false);
    }
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />
      <section className="main-section">
        <div className="page-heading py-16 max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Smart Feedback for Your Dream Job</h1>

          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <h2 className="text-xl">{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full max-w-md"
                alt="Scanning resume animation"
              />
            </div>
          ) : (
            <h2 className="text-xl mb-8">Drop your resume for an ATS check</h2>
          )}

          {!isProcessing && (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="form-div">
                <label htmlFor="company-name" className="block font-medium mb-1">
                  Company Name
                </label>
                <input
                  id="company-name"
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-title" className="block font-medium mb-1">
                  Job Title
                </label>
                <input
                  id="job-title"
                  type="text"
                  value={jobTitle}
                  onChange={(e) => setJobTitle(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-div">
                <label htmlFor="job-description" className="block font-medium mb-1">
                  Job Description
                </label>
                <textarea
                  id="job-description"
                  rows={5}
                  value={jobDescription}
                  onChange={(e) => setJobDescription(e.target.value)}
                  className="input-field"
                />
              </div>

              <div className="form-div">
                <label className="block font-medium mb-1">Upload Resume</label>
                <FileUploader onFileSelect={setFile} />
              </div>

              <button type="submit" className="primary-button mt-4">
                Analyze Resume
              </button>
            </form>
          )}
        </div>
      </section>
    </main>
  );
};

export default Upload;
