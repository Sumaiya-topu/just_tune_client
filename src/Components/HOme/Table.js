import { Card, Typography } from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { PiPlayPauseLight } from "react-icons/pi";
import apitaph from "../../assets/audios/Aurthohin_Apitaf.mp3";
import dukkhobilash from "../../assets/audios/Artcell_Dukkho_Bilash.mp3";
import nikristo from "../../assets/audios/Aurthohin_Nikkristo_2.mp3";
import intheend from "../../assets/audios/In_The_End_(Official_Video)_-_Linkin_Park.mp3";

const TABLE_HEAD = ["Audio prompt", "Play"];

const TABLE_ROWS = [
  {
    prompt:
      "1. Jazz funk based medium tempo (80 BPM) instrumental with keyboard intense rhythm with constant rhythm changes enhancing the funk genre.",
    audio: apitaph,
  },
  {
    prompt:
      "2. Disco pop based instrumental track with bass synth driven pattern (120 BPM) has to be a dance inducing track. ",
    audio: dukkhobilash,
  },

  {
    prompt:
      "3. Sub continental folk based track without flute can incorporate tabla, sitar, etc slow tempo based preferably (60 BPM)",
    audio: nikristo,
  },
  {
    prompt:
      "Heavy Metal track without rhythm guitar but inclusive of lead guitar solo parts, team can play the backing track. (150 BPM) Tempo.",
    audio: intheend,
  },
];

const Table = () => {
  const [isPlaying, setIsPlaying] = useState(
    new Array(TABLE_ROWS.length).fill(false)
  );
  const audioElements = TABLE_ROWS.map(() => new Audio());
  const toggleAudio = () => {
    setIsPlaying(!isPlaying);
  };
  const toggleIcon = (index) => {
    const updatedIsPlaying = [...isPlaying];
    updatedIsPlaying[index] = !updatedIsPlaying[index];
    setIsPlaying(updatedIsPlaying);

    const audio = audioElements[index];

    if (updatedIsPlaying[index]) {
      audio.play();
    } else {
      audio.pause();
      audio.currentTime = 0;
    }
  };

  return (
    <Card className="h-full w-full overflow-scroll">
      <table className="w-full min-w-max table-auto text-left">
        <thead>
          <tr>
            {TABLE_HEAD.map((head) => (
              <th
                key={head}
                className="border-b border-blue-gray-100 bg-blue-gray-50 p-4"
              >
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="font-normal leading-none opacity-70"
                >
                  {head}
                </Typography>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="">
          {TABLE_ROWS.map(({ prompt, audio }, index) => {
            const isLast = index === TABLE_ROWS.length - 1;
            const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

            return (
              <tr key={prompt} className="w-1/2">
                <td className={classes}>
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal"
                  >
                    {prompt}
                  </Typography>
                </td>

                <td className={classes} onClick={() => toggleIcon(index)}>
                  <audio controls className="w-full">
                    <source src={audio} type="audio/mpeg" />
                    Your browser does not support the audio element.
                  </audio>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </Card>
  );
};

export default Table;
