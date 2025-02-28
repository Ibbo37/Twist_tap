import React from 'react';

const ProgramDetails = () => {
  return (
    <div className=" flex items-start justify-start p-6">
      <div className="shadow-lg rounded-lg p-8 w-full max-w-4xl transform transition duration-500 hover:scale-105">
        <h1 className="text-3xl font-bold text-left text-white mb-4">Program Details</h1>
        <ul className="space-y-4">
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Certificate Program
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Duration: 3/ 6/ 9/ 12 Months, with an option to extend.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Design your own program with classes for students at levels Basic through Advanced in multiple styles.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Choose 11 classes weekly (Compulsory) from our schedule.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Concentrate on a style of your choice.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Develop relationships with our teachers through ongoing faculty mentoring.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Weekly Master Class with guest teacher.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Industry Insight Seminar with Instructor.
          </li>
          <li className="text-white text-lg flex items-start">
            <span className="text-blue-500 font-bold mr-2">&#8226;</span>
            Choreography, video shoot, and performance projects to explore different fields as a dancer.
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ProgramDetails;
