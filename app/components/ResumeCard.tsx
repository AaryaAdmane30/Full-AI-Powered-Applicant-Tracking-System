import { Link } from "react-router";
import ScoreCircle from "./ScoreCircle";

type ResumeProps = {
  resume: {
    id: string;
    companyName?: string;
    jobTitle?: string;
    imagePath?: string;
    feedback?: {
      overallScore: number;
    };
  };
};

export default function ResumeCard({ resume }: ResumeProps) {
  return (
    <Link to={`/resume/${resume.id}`} className="resume-card animate-in fade-in-duration">

      {/* Header row */}
      <div className="resume-card-header flex justify-between items-center">
        <div className="flex flex-col gap-2">
          <h2 className="text-black font-bold break-words">
            {resume.companyName || "Company Name"}
          </h2>

          <h3 className="text-lg break-words text-gray-500">
            {resume.jobTitle || "Job Title"}
          </h3>
        </div>

        <div className="flex items-center justify-center">
          <ScoreCircle score={resume.feedback?.overallScore ?? 0} />
        </div>
      </div>

      {/* Image BELOW */}
      <div className="gradient-border animate-in fade-in duration-700 mt-3">
        <div className="w-full">
          <img
            src={resume.imagePath}
            alt="resume"
            className="w-full h-[350px] max-sm:h-[200px] object-cover object-top"
          />
        </div>
      </div>

    </Link>
  );
}
