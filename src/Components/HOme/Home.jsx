import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import './Home.css';
import Table from './Table';
import { client } from '@gradio/client';
import axios from 'axios';

const Home = () => {
  const [inputData, setInputData] = useState({ promptText: '' });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handlePromptSubmit = async (data) => {
    const app = await client('9150de897fe67d41cd.gradio.live'); // Replace with your Gradio interface URL
    const result = await app.predict(0, [
      data.description,
      data.top_k,
      data.top_p,
      data.temperature,
      data.duration,
      data.cfg_coef,
    ]);

    const newData = { ...data, audio: result.data };
    // axios
    //   .post('http://localhost:8000/prompts', newData)
    //   .then((res) => {
    //     alert('Prompt added successfully!');
    //   })
    //   .catch((err) => console.log(err));
    console.log(result);
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
                onChange={(e) => setInputData({ ...inputData, promptText: e.target.value })}
                {...register('promptText')}
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
                    onChange={(e) => setInputData({ ...inputData, promptText: e.target.value })}
                    {...register('top-k')}
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
                    onChange={(e) => setInputData({ ...inputData, promptText: e.target.value })}
                    {...register('top-p')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                  {errors.age && <p>Please enter number for age.</p>}
                </div>
              </div>
              <div className="flex gap-1">
                <div>
                  <label htmlFor="" className="text-white">
                    Duration
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData, promptText: e.target.value })}
                    {...register('duration')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                </div>

                {errors.age && <p>Please enter number for age.</p>}
                <div>
                  {' '}
                  <label htmlFor="" className="text-white">
                    Cfg-co
                  </label>
                  <input
                    onChange={(e) => setInputData({ ...inputData, promptText: e.target.value })}
                    {...register('cfgco')}
                    type="text"
                    className="w-full p-2 border text-white border-gray-300 rounded-md mb-4 bg-transparent"
                  />
                  {errors.age && <p>Please enter number for age.</p>}
                </div>
              </div>

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
