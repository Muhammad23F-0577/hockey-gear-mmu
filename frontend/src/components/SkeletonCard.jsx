const SkeletonCard = () => {
  return (
    <div className="bg-gradient-to-br from-green-950 to-slate-900 rounded-xl border border-green-500/20 overflow-hidden p-4 animate-pulse shadow-lg shadow-green-500/10">
      
      {/* Image Skeleton */}
      <div className="bg-green-900/30 h-48 rounded-lg mb-4"></div>

      {/* Title */}
      <div className="bg-green-900/30 h-5 w-3/4 rounded mb-2"></div>

      {/* Subtitle */}
      <div className="bg-green-900/30 h-4 w-1/2 rounded mb-3"></div>

      {/* Button placeholder */}
      <div className="bg-green-900/30 h-10 w-full rounded-lg mb-3"></div>

      {/* Bottom row */}
      <div className="flex justify-between items-center">
        <div className="bg-green-900/30 h-8 w-24 rounded-full"></div>
        <div className="bg-green-900/30 h-6 w-16 rounded"></div>
      </div>
    </div>
  );
};

export default SkeletonCard;