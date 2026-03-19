import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Logo from '@/components/Logo'
import NavMenu from '@/components/NavMenu'
import { useAuth } from '@/hooks/useAuth'

export default function AppLayout() {

  const { data, isError, isLoading } = useAuth()

  if(isLoading) return 'Cargando...'
  if(isError) {
    return <Navigate to={'/auth/login'}/>
  }

  if(data) return (
    <>
      <div className='min-h-screen bg-app-gradient'>
        {/* Decorative gradient orbs */}
        <div className='fixed top-20 -left-40 w-80 h-80 bg-brand-400/10 rounded-full blur-3xl pointer-events-none'></div>
        <div className='fixed bottom-40 -right-40 w-80 h-80 bg-brandAccent-400/10 rounded-full blur-3xl pointer-events-none'></div>

        <header className='bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-white/5 shadow-sm py-5 relative z-20'>
          <div className='max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center'>
            <div className='w-64'>
              <Link to={'/'}>
                <Logo />
              </Link>
            </div>

            <NavMenu
              name={data.name}
            />
          </div>
        </header>

        <section className='max-w-screen-2xl mx-auto mt-10 p-5 relative z-10'>
          <Outlet />
        </section>

        <footer className='py-5 relative z-10'>
          <p className='text-center text-slate-500'>
            Todos los derechos reservados {new Date().getFullYear()}
          </p>
        </footer>
      </div>

      <ToastContainer
        pauseOnHover={false}
        pauseOnFocusLoss={false}
      />
    </>
  )
}
