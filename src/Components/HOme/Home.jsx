import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Home.css';
import Table from './Table';
import axios from 'axios';

const Home = () => {
  const [inputData, setInputData] = useState({ promptText: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePromptSubmit = async (data) => {
    // console.log(data);
    // const app = await client('https://79c81afc71f71a32cc.gradio.live/'); // Replace with your Gradio interface URL
   
    const gradioData ={
      text:data.text,
      top_k:data.top_k,
     top_p: data.top_p,
      temperature:data.temperature,
      duration:data.duration,
      cfg_coef:data.cfg_coef,
    }

    // const gradiodata2={"data":gradioData,"event_data":null,"fn_index":0,"session_hash":"xxx"};
    console.log("gradiodata",gradioData);
//     const config = {
//   headers: {
//     "Content-Type": "application/json",
//     "Host": "79c81afc71f71a32cc.gradio.live",
//   },
// };
     axios
      .post('http://localhost:5000/generate-audio', gradioData)
      .then((res) => {
        console.log(res.data);
        alert('Audio generated successfully!');
      })
      .catch((err) => console.log(err));

    // const result = await app.predict(0, gradioData);

    // const newData = { ...data, audio: result.data };
    // axios
    //   .post('http://localhost:8000/prompts', newData)
    //   .then((res) => {
    //     alert('Prompt added successfully!');
    //   })
    //   .catch((err) => console.log(err));
    // console.log(result);
  };
  return (
    <div className="">
      <div className="home h-screen pt-[100px]">
        <div className="flex justify-end pr-10">
          {' '}
          <div className="">
            <h1 className="text-white">
              Welcome to <br />
              <span className="text-4xl text-[#ED7014]  font-semibold">
                {' '}
                The Future of Music
              </span>{' '}
              <br /> <span className="text-2xl text-white"> AI-Driven Melodies</span>
            </h1>
            <form onSubmit={handleSubmit(handlePromptSubmit)} className="mt-5">
              <input
                onChange={(e) => setInputData({ ...inputData, text: e.target.value })}
                {...register('text')}
                type="text"
                placeholder="Low tempo with synth music"
                className="w-full p-2 border h-20 text-white border-gray-300 rounded-md mb-4 bg-transparent"
              />

              {errors.age && <p>Please enter number for age.</p>}
              <div className="flex gap-1">
                <div>
                  <label htmlFor="" className="text-white">
                    Top_k
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData,top_k: e.target.value })}
                    {...register('top_k')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                </div>

                {errors.age && <p>Please enter number for age.</p>}
                <div>
                  {' '}
                  <label htmlFor="" className="text-white">
                    Top_p
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData,top_p: e.target.value })}
                    {...register('top_p')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                  {errors.age && <p>Please enter number for age.</p>}
                </div>
                 <div>
                  <label htmlFor="" className="text-white">
                    Temperature
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData, temperature: e.target.value })}
                    {...register('temperature')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div>
                  <label htmlFor="" className="text-white">
                    Duration
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData, duration: e.target.value })}
                    {...register('duration')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                </div>
                {errors.age && <p>Please enter number for age.</p>}
                <div>
                  {' '}
                  <label htmlFor="" className="text-white">
                    Cfg-coef
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData, cfg_coef: e.target.value })}
                    {...register('cfg_coef')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                  {errors.age && <p>Please enter number for age.</p>}
                </div>
                 <div className=" w-full bg-[#ED7014] rounded-lg flex justify-center">
                <input
                  type="submit"
                  className="text-white  block px-10 py-2 "
                  value="Generate Tune"
                />
              </div>
              </div>

              {errors.age && <p>Please enter number for age.</p>}
             
            </form>
          </div>
        </div>
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
