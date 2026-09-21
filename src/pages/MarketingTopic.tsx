import { Navigate, useParams } from "react-router-dom";
import { MarketingPage } from "@/components/marketing/MarketingPage";
import { marketingPages } from "@/data/marketingPages";

/** Renders whichever footer page the URL names. */
const MarketingTopic = ({ slug }: { slug?: string }) => {
  const params = useParams<{ slug: string }>();
  const key = slug ?? params.slug ?? "";
  const content = marketingPages[key];

  if (!content) return <Navigate to="/" replace />;

  return <MarketingPage content={content} />;
};

export default MarketingTopic;
