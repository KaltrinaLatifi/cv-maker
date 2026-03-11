/*src\pages\EditResumePage.jsx*/
import { useEffect } from "react";
import { setAuthToken } from "../api/client";
import ResumeEditor from "../components/ResumeEditor/ResumeEditor";
import { useParams } from "react-router-dom"; // if you use React Router

export default function EditResumePage() {
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;

  // get your JWT (adjust if you keep it elsewhere)
  useEffect(() => {
    const token = localStorage.getItem("jwt") || "";
    setAuthToken(token);
  }, []);

  return <ResumeEditor resumeId={id} />;
}
