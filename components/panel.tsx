export default function Panel({ children, title, className }: { children: React.ReactNode, title: string, className?: string }) {
  return (
    <div className={`border border-matrix-green/30 bg-black/40 backdrop-blur-sm p-4 relative flex flex-col ${className}`}>
      {/* Glow Effect */}
      <div className="absolute inset-0 shadow-[0_0_15px_rgba(0,255,65,0.1)] pointer-events-none" />
      
      {/* Title Bar */}
      <div className="text-xs uppercase text-matrix-green/50 mb-2 border-b border-matrix-green/20 pb-1 flex-none">
        {title}
      </div>
      
      {/* Content */}
      <div className="text-matrix-green font-mono flex-1 relative overflow-hidden">
        {children}
      </div>
    </div>
  );
}