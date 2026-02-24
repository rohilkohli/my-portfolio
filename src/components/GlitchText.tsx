import React from 'react';

export const GlitchText = ({ text, className = "" }: { text: string, className?: string }) => {
  return (
    <div className={`glitch-wrapper ${className}`}>
      <span className="glitch" data-text={text}>
        {text}
      </span>
    </div>
  );
};
