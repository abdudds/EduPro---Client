import React from 'react'

function Failed() {
  return (
    <div className=" mx-auto mt-20 w-full">
      <div className="flex   w-full">
        <form className="w-full max-w-5xl mx-auto bg-red-100 px-4 py-2 rounded-md border border-red-700 shadow-lg flex">
          <div className="text-red-500 flex items-center mb-4">
            <svg
              className="w-12 h-12 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 5v7m0 4h.01m-6.938 6H18a2 2 0 002-2V5a2 2 0 00-2-2H6a2 2 0 00-2 2v14a2 2 0 002 2z"
              ></path>
            </svg>
          </div>
          <div>
            <div className="text-xl font-semibold">
              Oops! Something went wrong.
            </div>
            <p className="text-gray-600 mb-4">
              While trying to reserve money from your account.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Failed