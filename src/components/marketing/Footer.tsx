import { Link } from "react-router-dom";

import { Logo } from "@/components/marketing/Logo";

import footerAppleIcon from "@/assets/landing-v2/footer-apple-icon.svg";
import footerGooglePlayIcon from "@/assets/landing-v2/footer-google-play-icon.svg";
import socialInstagram from "@/assets/landing-v2/social-instagram.svg";
import socialFacebook from "@/assets/landing-v2/social-facebook.svg";
import socialLinkedin from "@/assets/landing-v2/social-linkedin.svg";
import socialTwitter from "@/assets/landing-v2/social-twitter.svg";

export function Footer() {
  return (
    <footer className="bg-brand-nearBlack text-white">
      <div className="max-w-[1360px] mx-auto px-6 lg:px-8 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
        <div className="flex flex-col gap-4">
          <Logo light />
          <p className="text-brand-grey600 text-sm">Deexoptions © {new Date().getFullYear()}</p>
          <div className="flex gap-3">
            <a href="#" className="flex items-center gap-2 border border-brand-sky/30 rounded-md px-2.5 py-1.5">
              <img src={footerAppleIcon} alt="" className="h-7 w-7" />
              <span className="flex flex-col text-brand-sky leading-tight">
                <span className="text-[9px] font-manrope font-medium">Get DeeX</span>
                <span className="text-xs font-manrope font-bold">App Store</span>
              </span>
            </a>
            <a href="#" className="flex items-center gap-2 border border-brand-sky/30 rounded-md px-2.5 py-1.5">
              <img src={footerGooglePlayIcon} alt="" className="h-7 w-7" />
              <span className="flex flex-col text-brand-sky leading-tight">
                <span className="text-[9px] font-manrope font-medium">Get DeeX</span>
                <span className="text-xs font-manrope font-bold">Play Store</span>
              </span>
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-white">COMPANY</p>
            <div className="flex flex-col gap-2 text-brand-grey400 text-sm">
              <Link to="/company/about">About</Link>
              <Link to="/merchant">Merchant</Link>
              <Link to="/company/blog">Blog</Link>
              <Link to="/company/contact">Contact Us</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-white">REWARDS</p>
            <div className="flex flex-col gap-2 text-brand-grey400 text-sm">
              <Link to="/rewards-programme/football-fantasy">Football Fantasy</Link>
              <Link to="/rewards-programme/refer">Refer and Earn</Link>
              <Link to="/rewards-programme/tasks">Deex Tasks</Link>
              <Link to="/rewards-programme/influencer">Become our Influencer</Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-white">PRODUCTS</p>
            <div className="flex flex-col gap-2 text-brand-grey400 text-sm">
              <Link to="/products/buy-sell">Buy and Sell</Link>
              <Link to="/products/swap">Swap</Link>
              <Link to="/products/bills">Utility and Bills</Link>
              <Link to="/products/giftcards">Giftcards</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-white">NEED HELP?</p>
            <div className="flex flex-col gap-2 text-brand-grey500 text-sm">
              <Link to="/faq">FAQ</Link>
              <a href="mailto:support@deexoptions.com">support@deexoptions.com</a>
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-white">LEGAL</p>
            <div className="flex flex-col gap-2 text-brand-grey500 text-sm">
              <Link to="/policies/terms">Terms &amp; Conditions</Link>
              <Link to="/policies/privacy">Privacy Policy</Link>
              <Link to="/policies/compliance">Compliance</Link>
              <Link to="/policies/aml">AML requirements</Link>
            </div>
          </div>
          <div className="flex flex-col gap-4">
            <p className="font-semibold text-white">SOCIALS</p>
            <div className="flex gap-4">
              <a href="#"><img src={socialInstagram} alt="Instagram" className="h-6 w-6" /></a>
              <a href="#"><img src={socialFacebook} alt="Facebook" className="h-6 w-6" /></a>
              <a href="#"><img src={socialLinkedin} alt="LinkedIn" className="h-6 w-6" /></a>
              <a href="#"><img src={socialTwitter} alt="Twitter" className="h-6 w-6" /></a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
