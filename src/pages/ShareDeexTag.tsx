import { useNavigate } from "react-router-dom";
import ShareDetail from "@/components/dashboard/ShareDetail";
import { transferNotes } from "./DepositCash";

/** The handle other DeeX users send to (Figma 299:23537). */
const deexTag = "Moski";

const ShareDeexTag = () => {
  const navigate = useNavigate();

  return (
    <ShareDetail
      title="Share DeeX Tag"
      eyebrow="Your DeeX Tag"
      heading="Receive your Funds"
      value={`@${deexTag}`}
      copyLabel="DeeX Tag"
      notes={transferNotes}
      onBack={() => navigate(-1)}
      onDone={() => navigate("/dashboard")}
    />
  );
};

export default ShareDeexTag;
