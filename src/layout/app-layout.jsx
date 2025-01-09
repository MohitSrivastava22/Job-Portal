import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/ui/Header'

const AppLayout = () => {
  return (
    <div>
      <div className='grid-background'></div>
      <main className='min-h-screen container'>
        <Header/>
        {/*  The Outlet component in React Router DOM is a placeholder that renders matched child route components in a layout:  */}
        {/* The Outlet component is useful when multiple routes share a common layout. It ensures that the content of each route is dynamically injected into the layout.  */}
        {/* The Outlet component is a placeholder within a parent route's component that tells React Router where to render the child routes.  */}
        <Outlet />
      </main>
      <div className='p-10 text-center bg-gray-800 mt-10'>
        Made with 💗 by Mohit Srivastava
      </div>
    </div>
  )
}

export default AppLayout
