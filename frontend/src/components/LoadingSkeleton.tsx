export const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse space-y-4">
      <div className="h-48 bg-gray-300 rounded-lg w-full"></div>
      <div className="h-6 bg-gray-300 rounded w-3/4"></div>
      <div className="h-4 bg-gray-300 rounded w-1/2"></div>
      <div className="flex justify-between mt-4">
        <div className="h-6 bg-gray-300 rounded w-1/4"></div>
        <div className="h-8 bg-gray-300 rounded w-1/3"></div>
      </div>
    </div>
  );
};
