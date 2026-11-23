import React, { useState } from 'react';
import { Shield } from 'lucide-react';

interface MediaFrameProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
  imgClassName?: string;
  aspectRatio?: string;
}

export const MediaFrame: React.FC<MediaFrameProps> = ({
  src,
  alt,
  title,
  className = '',
  imgClassName = 'w-full h-full object-cover',
  aspectRatio,
}) => {
  const [hasError, setHasError] = useState(false);

  return (
    <div
      className={`relative overflow-hidden bg-[#111827] ${className}`}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      {!hasError ? (
        <img
          src={src}
          alt={alt}
          referrerPolicy="no-referrer"
          onError={() => setHasError(true)}
          className={imgClassName}
          loading="lazy"
        />
      ) : (
        <div className="w-full h-full flex flex-col items-center justify-center p-6 bg-gradient-to-br from-[#151E2E] to-[#090D16] text-center">
          <Shield className="w-8 h-8 text-amber-500/70 mb-2" strokeWidth={1.5} />
          <span className="text-xs font-medium text-slate-300">{title || alt}</span>
        </div>
      )}
    </div>
  );
};
