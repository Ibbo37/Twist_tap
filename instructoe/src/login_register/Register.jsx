import React from "react";

const Register = () => {
  return (
    <div className="bg-black text-white flex justify-center items-center min-h-screen">
      <div className="bg-[rgb(34,34,34)] p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-[rgb(255,20,147)] mb-6">
          Instructor Registration
        </h2>
        <form className="space-y-4">
          <input type="text" placeholder="Full Name" className="w-full p-2 rounded bg-black text-white border border-gray-600" required />
          <input type="email" placeholder="Email" className="w-full p-2 rounded bg-black text-white border border-gray-600" required />
          <input type="password" placeholder="Password" className="w-full p-2 rounded bg-black text-white border border-gray-600" required />
          <input type="number" placeholder="Years of Experience" className="w-full p-2 rounded bg-black text-white border border-gray-600" required />
          <input type="text" placeholder="Expertise (e.g., Ballet, Hip-Hop)" className="w-full p-2 rounded bg-black text-white border border-gray-600" required />
          <input type="text" placeholder="Certifications (if any)" className="w-full p-2 rounded bg-black text-white border border-gray-600" />
          <label className="block text-gray-400">Upload Resume or Experience Document:</label>
          <input type="file" className="w-full p-2 rounded bg-black text-white border border-gray-600" required />
          <button type="submit" className="w-full bg-[rgb(255,20,147)] text-black font-bold py-2 rounded hover:bg-[rgb(220,20,120)]">
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
