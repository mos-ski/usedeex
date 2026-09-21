import { cn } from "@/lib/utils";

/**
 * An iPhone frame around a real screenshot of the app, captured by
 * `scripts/capture-app-screens.mjs`. Drawn rather than an exported image so
 * the frame stays crisp and the screen inside can be swapped by re-running
 * the capture after a redesign.
 */
export const PhoneMockup = ({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) => (
  <div className={cn("relative mx-auto w-full max-w-[300px]", className)}>
    {/* Body */}
    <div className="relative rounded-[3rem] bg-brand-ink p-3 shadow-[0_30px_60px_-20px_rgba(11,35,55,0.45)] ring-1 ring-black/5">
      {/* Screen */}
      <div className="relative overflow-hidden rounded-[2.25rem] bg-white">
        <img src={src} alt={alt} loading="lazy" className="block aspect-[390/844] w-full object-cover object-top" />

        {/* Dynamic island */}
        <span
          aria-hidden="true"
          className="absolute left-1/2 top-2.5 h-6 w-[5.5rem] -translate-x-1/2 rounded-full bg-brand-ink"
        />
      </div>

      {/* Side buttons */}
      <span aria-hidden="true" className="absolute -left-[3px] top-[7rem] h-10 w-[3px] rounded-l bg-brand-ink/70" />
      <span aria-hidden="true" className="absolute -left-[3px] top-[10rem] h-16 w-[3px] rounded-l bg-brand-ink/70" />
      <span aria-hidden="true" className="absolute -right-[3px] top-[9rem] h-20 w-[3px] rounded-r bg-brand-ink/70" />
    </div>
  </div>
);

export default PhoneMockup;
