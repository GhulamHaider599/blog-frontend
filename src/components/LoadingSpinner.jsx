import React from 'react';

export default function LoadingSpinner({ size = "default", text = "Loading..." }) {
  const sizeClasses = {
    small: "w-4 h-4",
    default: "w-8 h-8",
    large: "w-12 h-12"
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[200px]">
      <div className={`${sizeClasses[size]} relative`}>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-gray-200 rounded-full"></div>
        <div className="absolute top-0 left-0 w-full h-full border-4 border-blue-500 rounded-full animate-spin border-t-transparent"></div>
      </div>
      {text && (
        <p className="mt-4 text-gray-600 dark:text-gray-400 font-medium">{text}</p>
      )}
    </div>
  );
} 