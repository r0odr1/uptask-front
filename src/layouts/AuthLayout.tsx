import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
      <div className='bg-gray-800 min-h-screen flex items-center justify-center px-4'>
        <div className='w-full max-w-[450px]'>
          <Logo />
          <div className='mt-8'>
            <Outlet />
          </div>
        </div>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
