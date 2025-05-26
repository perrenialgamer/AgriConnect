import { useState } from 'react'
import { Outlet } from 'react-router-dom';
import LeftBar from './components/Layout';
function App() {
  return (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-500"> {/* This outer div is redundant */}
      <div className='w-full block'> {/* This inner div is also redundant */}
        <LeftBar /> {/* This is your Layout component with its own <Outlet /> */}
        <main className="flex-1 overflow-y-auto p-4 lg:ml-64"> {/* This is a SECOND <Outlet /> */}
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default App
