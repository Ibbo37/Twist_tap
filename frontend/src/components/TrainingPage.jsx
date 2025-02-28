import React from 'react';
import "../index.css";
import ResetPassword from './ResetPassword';
import ProgramDetails from './ProgramDetails';
import ApplicationForm from './ApplicationForm';
import TuitionPage from './TuitionPage';

function TrainingPage() {
  return (
    <>
      <div className="flex flex-col items-center w-screen bg-black overflow-auto">
        {/* Header Section */}

        <header className="mt-10 text-center">
          <h1 className="text-pink-500 text-4xl shadow-md mx-[700px]">Welcome to Twist'n Tap</h1>
        </header>
        {/* Video Section */}
        <section className="flex justify-center items-center w-full mt-10">
          <video
            className="w-full max-w-screen-xl max-h-[70vh] rounded-xl shadow-2xl border-4 border-double border-pink-500 p-2"
            controls
            autoPlay
          >
            <source src="/CategoriesImg/Pages/HipHopV1.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>

        {/* About Section */}
        <section className="w-full px-4 py-8 bg-black">
          <div className="max-w-screen-xl mx-auto relative">
            <div className="relative w-full max-h-[70vh] rounded-xl shadow-2xl border-4 border-double border-pink-500 overflow-hidden">
              <img
                src="/LoginImg/about.jpg"
                alt="About Twist'n Tap"
                className="w-full h-full object-cover transform scale-110"
              />
              {/* Overlay Text */}
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white bg-black bg-opacity-50">
                <h2 className="text-3xl font-bold underline mb-6">About</h2>
                <p className="text-lg px-6 text-center leading-relaxed mt-6">
                  Intensive Training Program is a certificate course carefully designed
                  to facilitate training and development in a welcoming and supportive
                  environment for all levels of dancers. It provides more than 60 hours
                  of dance classes in a month taught by our in-house faculty and guest
                  teachers.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <ProgramDetails/>
          </section>
          <section>
          <ApplicationForm/>
          </section>
          <section>
          <TuitionPage/>
          </section>
        
      </div>
    </>
  );
}

export default TrainingPage;
