import React, { useState } from "react";
import { useForm } from "react-hook-form";
import "./Home.css";
import Table from "./Table";
import AudioPlayer from "./AudioPlayer";
// import { client } from "@gradio/client";
import axios from "axios";
const Home = () => {
  const [inputData, setInputData] = useState({ promptText: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePromptSubmit = async (data) => {
    // const app = await client("https://6969c6492bec4f017d.gradio.live/"); // Replace with your Gradio interface URL
    // const result = await app.predict(0, [
    //   data.description,
    //   data.top_k,
    //   data.top_p,
    //   data.temperature,
    //   data.duration,
    //   data.cfg_coef,
    // ]);

    // Send the result to JSON Server
    // const response = await fetch("http://localhost:3000/results", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ audio_url: result.data }),
    // });

    // if (response.ok) {
    // Handle a successful response (e.g., show a success message)
    // } else {
    // Handle errors
    // }
    axios
      .post("http://localhost:8000/prompts", data)
      .then((res) => {
        alert("Prompt added successfully!");
      })
      .catch((err) => console.log(err));
    console.log(data);
  };
  return (
    <div className="">
      <div className="home h-screen pt-[200px]">
        <div className="flex justify-center">
          {" "}
          <h1 className="text-white">
            Welcome to the Future of Music: AI-Driven Melodies
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(handlePromptSubmit)}
          className=" w-1/2 mx-auto"
        >
          <input
            onChange={(e) =>
              setInputData({ ...inputData, promptText: e.target.value })
            }
            {...register("promptText")}
            type="text"
            className="w-full p-2 border h-20 border-gray-300 rounded-md mb-4 bg-transparent"
          />

          {errors.age && <p>Please enter number for age.</p>}
          <div className="flex justify-center">
            <input
              type="submit"
              className="text-white bg-[#ED7014] rounded-lg block px-10 py-2"
              value="Generate Tune"
            />
          </div>
        </form>
      </div>
      <div className="mt-20 w-3/4 mx-auto">
        <h1 className="text-[#ED7014] text-2xl mb-5 font-semibold ">
          🎶 Your Words, Their Symphony: 🎶
        </h1>
        <Table></Table>
      </div>
    </div>
  );
};

export default Home;
