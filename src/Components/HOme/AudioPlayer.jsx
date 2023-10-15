import React, { useState } from "react";
import apitaph from "../../assets/audios/Aurthohin_Apitaf.mp3";
const AudioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="max-w-sm mx-auto p-4">
      <audio controls className="w-full">
        <source src={apitaph} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div className="flex items-center justify-center mt-4">
        <button
          onClick={toggleAudio}
          className="bg-blue-500 text-white font-semibold py-2 px-4 rounded-md hover:bg-blue-600"
        >
          {isPlaying ? "Pause" : "Play"}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
