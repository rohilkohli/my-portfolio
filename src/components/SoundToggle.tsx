import React, { useState } from 'react';
import useSound from 'use-sound';
import { Volume2, VolumeX } from 'lucide-react';

export function SoundToggle() {
  const [isMuted, setIsMuted] = useState(true);
  
  // Note: In a real app, you would import actual sound files here
  // const [playClick] = useSound('/sounds/click.mp3');
  
  const toggleSound = () => {
    setIsMuted(!isMuted);
    // if (isMuted) playClick();
  };

  return (
    <button 
      onClick={toggleSound}
      className="fixed bottom-8 right-8 z-50 p-4 bg-black/50 backdrop-blur-md border border-white/10 rounded-full text-white/50 hover:text-[#00f0ff] hover:border-[#00f0ff]/50 transition-all duration-300"
    >
      {isMuted ? <VolumeX size={20} /> : (
        <div className="flex items-center gap-1">
          <Volume2 size={20} />
          <div className="flex gap-0.5 items-end h-3">
            <div className="w-0.5 bg-[#00f0ff] animate-[bounce_1s_infinite] h-full" />
            <div className="w-0.5 bg-[#00f0ff] animate-[bounce_1.2s_infinite] h-2/3" />
            <div className="w-0.5 bg-[#00f0ff] animate-[bounce_0.8s_infinite] h-1/2" />
          </div>
        </div>
      )}
    </button>
  );
}
