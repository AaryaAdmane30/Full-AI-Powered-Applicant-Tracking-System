
import { resumes } from "~/constants/Index";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";

export function meta() {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback for your dream job" },
  ];
}

export default function Home() {
  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16 ">
          <h1>Track Applications & Resume Ratings</h1>
          <h2>Review your submission and check AI-powered feedback</h2>
        </div>



        
{resumes.length > 0 && (
  <div className="resumes-section">
    {resumes.map((resume) => (
      <div key={resume.id}>
        <h1>{resume.jobTitle}</h1>
        <ResumeCard resume={resume} />
      </div>
    ))}
  </div>
)}
      </section>


      
      
    </main>
  );
}
