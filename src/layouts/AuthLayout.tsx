import Logo from '@/components/Logo'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function AuthLayout() {
  return (
    <>
      <div className='min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4 relative overflow-hidden'>
        {/* Animated gradient orbs background */}
        <div className='absolute top-0 left-0 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl animate-float'></div>
        <div className='absolute bottom-0 right-0 w-96 h-96 bg-brandAccent-500/20 rounded-full blur-3xl animate-float' style={{ animationDelay: '2s' }}></div>

        <div className='w-full max-w-[450px] relative z-10'>
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
