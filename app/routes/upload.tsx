import React, { useState } from 'react';
import FileUploader from '~/components/FileUploader';
import Navbar from '~/components/Navbar';

const Upload = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload a resume first");
      return;
    }

    setIsProcessing(true);
    setStatusText('Scanning your resume... please wait 🔍');

    setTimeout(() => {
      setIsProcessing(false);
      setStatusText('Resume scanned successfully 🎯');
    }, 3000);
  };

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Smart Feedback for your dream Job</h1>

          {isProcessing ? (
            <>
              <h2>{statusText}</h2>
              <img
                src="/images/resume-scan.gif"
                className="w-full"
                alt="Scanning resume animation"
              />
            </>
          ) : (
            <h2>Drop your resume for an ATS check</h2>
          )}

          {!isProcessing && (
            <form
              id="upload-form"
              onSubmit={handleSubmit}
              className="flex flex-col gap-4 mt-8"
            >
              <div className='form-div'>
                <label htmlFor='company-name'>Company Name</label>
                <input type='text' id='company-name' placeholder='Company Name' />
              </div>

              <div className='form-div'>
                <label htmlFor='job-title'>Job Title</label>
                <input type='text' id='job-title' placeholder='Job Title' />
              </div>

              <div className='form-div'>
                <label htmlFor='job-description'>Job Description</label>
                <textarea rows={5} id='job-description' placeholder='Job Description'></textarea>
              </div>

              <div className='form-div'>
                <label htmlFor='uploader'>Upload Resume</label>
                <FileUploader onFileSelect={setFile} />
              </div>

              <button className='primary-button' type='submit'>
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
