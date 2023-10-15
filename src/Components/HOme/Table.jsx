import { Card, Typography } from '@material-tailwind/react';
import React, { useEffect, useState } from 'react';
import apitaph from '../../assets/audios/Aurthohin_Apitaf.mp3';
import dukkhobilash from '../../assets/audios/Artcell_Dukkho_Bilash.mp3';
import nikristo from '../../assets/audios/Aurthohin_Nikkristo_2.mp3';
import intheend from '../../assets/audios/In_The_End_(Official_Video)_-_Linkin_Park.mp3';

const AudioPlayer = () => {
  const [audioData, setAudioData] = useState([]);
  useEffect(() => {
    fetch(' http://localhost:8000/prompts')
      .then((res) => res.json())
      .then((data) => {
        setAudioData(data);
      });
  }, [audioData]);
  //   const audioElements = AudioPrompts.map(() => new Audio());

  return (
    <Card className="h-full w-full overflow-scroll  grid grid-cols-3 gap-5 ">
      {audioData?.map(({ inputText, audio, id }, index) => {
        const isLast = index === audioData?.length - 1;
        const classes = isLast ? 'p-4' : 'p-4 border-b border-blue-gray-50';

        return (
          <div className=" shadow-lg bg-slate-100">
            <div key={prompt} className={classes}>
              <Typography variant="small" color="blue-gray" className="font-normal">
                {inputText}
              </Typography>

              <audio controls className="w-full mt-4">
                <source src={audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </div>
          </div>
        );
      })}
    </Card>
  );
};

export default AudioPlayer;
