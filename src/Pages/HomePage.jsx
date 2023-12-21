import React from 'react';
import { TypeAnimation } from 'react-type-animation';
import { MdOutlineDataExploration } from "react-icons/md";
import { Link } from 'react-router-dom';
import Beneficiary from '../Components/Beneficiary';
import { Helmet } from 'react-helmet';


const HomePage = () => {
  return (
    <div className="mx-auto max-w-screen-xl">
      <Helmet>
        <title>{'Task Manager || Home'}</title>
      </Helmet>
      <div className="rounded-b-xl bg-[url('https://i.ibb.co/wKLSq1P/image.png')]">
        <div className="rounded-xl flex justify-between gap-3 items-center w-full bg-gradient-to-r from-cyan-500 to-gray-500 opacity-80">
          <div className="flex-1 text-white  p-10 rounded-xl" >


            <TypeAnimation
              className="text-2xl text-red-800 font-bold my-3"
              sequence={[
                'Task Manager',
                3000,
                'Hi, Welcome'
              ]}
              style={{ fontSize: '2em' }}
              repeat={Infinity}
            />


            <p className="text-xl font-medium text-justify my-5">"Revolutionize task management with SCC Technovision Inc. Unleash the power of React.js for a seamless, responsive, and collaborative platform. Effortlessly create, prioritize, and organize tasks with drag-and-drop simplicity. Elevate your productivity today!"
            </p>


            <div className="text-center">


              <Link to={"/dashboard"}>
                <button data-aos="fade-left" className="btn font-bold bg-blue-900 text-2xl text-white mx-5"> <MdOutlineDataExploration />  Let's Explore</button>
              </Link>
            </div>
          </div>

          <div data-aos="fade-down" className="">
            <img className="rounded-full w-[400px] h-[400px]" src="https://i.ibb.co/K6C5ZBY/task-management-hero-banner-removebg-preview.png" alt="" />
          </div>
        </div>

      </div>


      <Beneficiary />
    </div>
  );
};

export default HomePage;