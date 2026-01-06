

import { resumes } from "~/constants/Index";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import {
  useNavigate,
  type NavigateFunction,
} from "react-router";
import { useEffect } from "react";

export function meta() {
  return [
    { title: "Resumind" },
    { name: "description", content: "Smart Feedback for your dream job" },
  ];
}

export default function Home() {
  const { auth, isLoading } = usePuterStore();
  const navigate: NavigateFunction = useNavigate();

  useEffect(() => {
    // Wait for auth check to finish before redirecting to Auth
    if (!isLoading && !auth.isAuthenticated) {
      navigate("/auth?next=/");
    }
  }, [isLoading, auth.isAuthenticated, navigate]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover">
      <Navbar />

      <section className="main-section">
        <div className="page-heading py-16">
          <h1>Track Applications & Resume Ratings</h1>
          <h2>Review your submission and check AI-powered feedback</h2>
        </div>

        {resumes.length > 0 && (
          <div className="resumes-section">
            {resumes.map((resume) => (
              <div key={resume.id}>
                <h3>{resume.jobTitle}</h3>
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
