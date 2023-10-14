import React from "react";
import { useForm } from "react-hook-form";
import "./Home.css";
import Table from "./Table";
import AudioPlayer from "./AudioPlayer";
const Home = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePromptSubmit = (data) => {
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
            {...register("prompt")}
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
