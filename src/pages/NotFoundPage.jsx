import React from 'react'
import { useNavigate } from 'react-router-dom'

function NotFoundPage() {
    const navigate = useNavigate()
  return (
    <main className="grid place-items-center min-h-screen min-w-screen bg-gray-100 p-16 text-gray-700 font-light">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl items-center">
        <div className="space-y-4">
          <span className="bg-blue-500 text-white px-4 py-2 rounded-full">404 error</span>
          <h1 className="text-4xl font-semibold text-black">Page not found</h1>
          <p className="text-lg">Sorry, the page you are looking for does not exist or has been moved. Here are some useful links:</p>
          <a onClick={()=>navigate(-1)} className="flex items-center text-blue-600 hover:underline" >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 mr-2 transform rotate-180" viewBox="0 0 24 24">
              <path fill="currentColor" d="m10.875 19.3l-6.6-6.6q-.15-.15-.213-.325T4 12q0-.2.063-.375t.212-.325l6.6-6.6q.275-.275.688-.287t.712.287q.3.275.313.688T12.3 6.1L7.4 11h11.175q.425 0 .713.288t.287.712q0 .425-.287.713t-.713.287H7.4l4.9 4.9q.275.275.288.7t-.288.7q-.275.3-.7.3t-.725-.3Z" />
            </svg>
            GO BACK
          </a>
        </div>
        <div>
          <img src="https://tradermade.com/static/imgs/404.png" alt="404 Error" className="mx-auto max-w-sm" />
        </div>
      </div>
    </main>
  )
}

export default NotFoundPage