import { Card, Typography } from "@material-tailwind/react";
import React, { useState } from "react";
import apitaph from "../../assets/audios/Aurthohin_Apitaf.mp3";
import dukkhobilash from "../../assets/audios/Artcell_Dukkho_Bilash.mp3";
import nikristo from "../../assets/audios/Aurthohin_Nikkristo_2.mp3";
import intheend from "../../assets/audios/In_The_End_(Official_Video)_-_Linkin_Park.mp3";

const AudioPrompts = [
  {
    prompt:
      "1. Jazz funk based medium tempo (80 BPM) instrumental with keyboard intense rhythm with constant rhythm changes enhancing the funk genre.",
    audio: apitaph,
  },
  {
    prompt:
      "2. Disco pop based instrumental track with bass synth driven pattern (120 BPM) has to be a dance-inducing track.",
    audio: dukkhobilash,
  },
  {
    prompt:
      "3. Subcontinental folk based track without flute can incorporate tabla, sitar, etc slow tempo based preferably (60 BPM)",
    audio: nikristo,
  },
  {
    prompt:
      "Heavy Metal track without rhythm guitar but inclusive of lead guitar solo parts, team can play the backing track. (150 BPM) Tempo.",
    audio: intheend,
  },
];

const AudioPlayer = () => {
  //   const audioElements = AudioPrompts.map(() => new Audio());

  return (
    <Card className="h-full w-full overflow-scroll  grid grid-cols-3 gap-5 ">
      {AudioPrompts.map(({ prompt, audio }, index) => {
        const isLast = index === AudioPrompts.length - 1;
        const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

        return (
          <div className=" shadow-lg bg-slate-100">
            <div key={prompt} className={classes}>
              <Typography
                variant="small"
                color="blue-gray"
                className="font-normal"
              >
                {prompt}
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
