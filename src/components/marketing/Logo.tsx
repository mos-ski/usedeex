import { Link } from "react-router-dom";

import deexLogo from "@/assets/landing-v2/deex-logo.svg";
import deexLogoLight from "@/assets/landing-v2/deex-logo-light.svg";

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center shrink-0">
      <img src={light ? deexLogoLight : deexLogo} alt="Deex" className="h-7 w-auto" />
    </Link>
  );
}
