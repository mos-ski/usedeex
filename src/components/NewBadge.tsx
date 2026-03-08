const NewBadge = ({ className = "" }: { className?: string }) => (
  <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[9px] font-bold tracking-wider bg-[hsl(var(--warning))] text-background uppercase animate-pulse ${className}`}>
    NEW
  </span>
);

export default NewBadge;
