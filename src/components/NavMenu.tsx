import { Fragment } from 'react'
import { Popover, PopoverButton, PopoverPanel, Transition } from '@headlessui/react'
import { Bars3Icon, UserCircleIcon, FolderIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'
import { User } from '../types'
import { useQueryClient } from '@tanstack/react-query'

type NavMenuProps = {
  name: User['name']
}

export default function NavMenu({name} : NavMenuProps) {

  const queryClient = useQueryClient()
  const logout = () => {
    localStorage.removeItem('AUTH_TOKEN')
    queryClient.invalidateQueries({queryKey: ['user']})
  }

  // Obtener la inicial del nombre
  const userInitial = name.charAt(0).toUpperCase()

  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 p-2 rounded-lg bg-gradient-to-r from-brand-600 to-brandMagenta-600 hover:from-brand-700 hover:to-brandMagenta-700 transition-all duration-200 hover:scale-110 shadow-lg hover:shadow-xl">
        <Bars3Icon className='w-8 h-8 text-white' />
      </PopoverButton>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel className="absolute left-1/2 z-10 mt-5 flex w-screen lg:max-w-sm -translate-x-1/2 lg:-translate-x-48">
          <div className="w-full lg:w-64 shrink rounded-2xl glass-panel p-6 text-sm font-semibold leading-6 shadow-2xl border border-white/30 backdrop-blur-xl">
            <div className="flex items-center gap-4 pb-4 mb-4 border-b border-white/20">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-brand-500 to-brandMagenta-600 flex items-center justify-center text-lg font-bold text-white shadow-lg">
                {userInitial}
              </div>
              <div className="flex-1">
                <p className="text-brandAccent-400 text-xs uppercase tracking-widest font-bold opacity-100 mb-1">Bienvenido</p>
                <p className="text-white font-bold text-base">
                  {name}
                </p>
              </div>
            </div>

            <Link
              to='/profile'
              className='flex items-center gap-3 p-3 rounded-lg hover:bg-brand-600/40 transition-all duration-200 text-white hover:text-brandAccent-300 group mb-2 font-semibold'
            >
              <UserCircleIcon className='w-5 h-5 text-brandAccent-400 transition-transform group-hover:scale-125 drop-shadow-lg' />
              <span>Mi Perfil</span>
            </Link>

            <Link
              to='/'
              className='flex items-center gap-3 p-3 rounded-lg hover:bg-brand-600/40 transition-all duration-200 text-white hover:text-brandAccent-300 group mb-2 font-semibold'
            >
              <FolderIcon className='w-5 h-5 text-brandAccent-400 transition-transform group-hover:scale-125 drop-shadow-lg' />
              <span>Mis Proyectos</span>
            </Link>

            <button
              className='flex items-center gap-3 w-full p-3 rounded-lg hover:bg-red-600/40 transition-all duration-200 text-white hover:text-orange-300 group font-semibold'
              type='button'
              onClick={logout}
            >
              <ArrowRightStartOnRectangleIcon className='w-5 h-5 text-orange-400 transition-transform group-hover:scale-125 drop-shadow-lg' />
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </PopoverPanel>
      </Transition>
    </Popover>
  )
}