import React, { useState } from 'react';
import { ImageOff, Loader2 } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  fallbackCategory?: string; // e.g., 'architecture', 'technology', 'abstract'
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt, 
  className, 
  fallbackSrc, 
  fallbackCategory = 'abstract',
  ...props 
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  // Reliable generic fallbacks from Unsplash based on category
  const defaultFallback = `https://source.unsplash.com/random/800x600/?${fallbackCategory},dark`;
  
  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setError(true);
  };

  const currentSrc = error ? (fallbackSrc || defaultFallback) : src;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading Skeleton */}
      {isLoading && (
        <div className="absolute inset-0 bg-neutral-900 animate-pulse flex items-center justify-center z-10">
          <Loader2 className="w-8 h-8 text-neutral-600 animate-spin" />
        </div>
      )}

      {/* Actual Image */}
      <img
        src={currentSrc}
        alt={alt}
        onLoad={handleLoad}
        onError={handleError}
        className={`w-full h-full object-cover transition-opacity duration-500 ${
          isLoading ? 'opacity-0' : 'opacity-100'
        }`}
        {...props}
      />

      {/* Error State Indicator (Optional: only if fallback also fails or just to show strictly) */}
      {error && !currentSrc && (
        <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center text-neutral-500 z-20">
          <ImageOff className="w-8 h-8 mb-2" />
          <span className="text-xs uppercase tracking-widest">Image Unavailable</span>
        </div>
      )}
    </div>
  );
};

export default ImageWithFallback;
