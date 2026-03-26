import { authenticateUser } from "@/api/AuthAPI";
import ErrorMessage from "@/components/ErrorMessage";
import { UserLoginForm } from "@/types/index";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

type FocusField = 'email' | 'password' | null;

function CatFace({ focusField, emailValue }: { focusField: FocusField; emailValue: string }) {
  const len = emailValue.length;

  // Movimientos de los ojos mientras se escribe
  const pupilX = focusField === 'email' ? Math.min(-2 + len * 0.5, 6) : 0;
  const pupilY = focusField === 'email' ? 2 : 0;

  const pawsUp = focusField === 'password';

  const label =
    focusField === 'email'    ? 'Te veo...' :
    focusField === 'password' ? '¡No miro!' : '¡Hola!';

  const grayDark   = '#4a4f5e'; // fur principal gris oscuro
  const grayMid    = '#6b7280'; // gris medio (zonas de sombra)
  const white      = '#f0efec'; // blanco del hocico / pecho / patitas
  const earInner   = '#c9b8c0'; // interior de oreja (rosado grisáceo)
  const noseColor  = '#e8a0aa'; // nariz rosada
  const irisColor  = '#7dab6e'; // iris verde-amarillento
  const irisRing   = '#4e7a42'; // anillo exterior del iris
  const pupilColor = '#1a1c23'; // pupila muy oscura
  const whisker    = '#d1cfc8'; // bigotes claros

  return (
    <div className="flex flex-col items-center select-none">
      <svg
        viewBox="0 0 200 200"
        width="130"
        height="130"
        xmlns="http://www.w3.org/2000/svg"
        overflow="hidden"
      >
        {/** Orejas (externo) */}
        <polygon points="35,90 62,18 87,90"    fill={grayDark} />
        <polygon points="113,90 138,18 165,90" fill={grayDark} />

        {/** Orejas (interno) */}
        <polygon points="47,84 62,34 75,84"    fill={earInner} />
        <polygon points="125,84 138,34 151,84" fill={earInner} />

        {/** Cabeza (base gris) */}
        <circle cx="100" cy="112" r="70" fill={grayDark} />

        {/** Parche blanco en el hocico */}
        <ellipse cx="100" cy="138" rx="36" ry="28" fill={white} />

        {/** Acentos oscuros en el frente */}
        <ellipse cx="72"  cy="92" rx="18" ry="10" fill={grayMid} opacity="0.4" />
        <ellipse cx="128" cy="92" rx="18" ry="10" fill={grayMid} opacity="0.4" />

        {/** Ojo Izquierdo */}
        <ellipse cx="72" cy="105" rx="20" ry="19" fill={white} />
        <circle  cx="72" cy="105" r="14" fill={irisColor} />
        <circle  cx="72" cy="105" r="14" fill="none" stroke={irisRing} strokeWidth="2" />
        <g style={{
          transform: `translate(${pupilX}px, ${pupilY}px)`,
          transition: 'transform 0.22s ease',
        }}>
          <ellipse cx="72" cy="106" rx="7" ry="10" fill={pupilColor} />
          <circle  cx="75" cy="101" r="3.5" fill="white" />
        </g>

        {/** Ojo Derecho */}
        <ellipse cx="128" cy="105" rx="20" ry="19" fill={white} />
        <circle  cx="128" cy="105" r="14" fill={irisColor} />
        <circle  cx="128" cy="105" r="14" fill="none" stroke={irisRing} strokeWidth="2" />
        <g style={{
          transform: `translate(${pupilX}px, ${pupilY}px)`,
          transition: 'transform 0.22s ease',
        }}>
          <ellipse cx="128" cy="106" rx="7" ry="10" fill={pupilColor} />
          <circle  cx="131" cy="101" r="3.5" fill="white" />
        </g>

        {/** Nariz*/}
        <polygon points="100,128 94,135 106,135" fill={noseColor} />

        {/** Boca */}
        <path
          d="M 94 135 Q 100 143 106 135"
          stroke="#9a7070" strokeWidth="1.8" fill="none" strokeLinecap="round"
        />

       {/** Bigotes */}
        <line x1="14"  y1="124" x2="74"  y2="129" stroke={whisker} strokeWidth="1.5" opacity="0.85" />
        <line x1="14"  y1="136" x2="74"  y2="133" stroke={whisker} strokeWidth="1.5" opacity="0.85" />
        <line x1="126" y1="129" x2="186" y2="124" stroke={whisker} strokeWidth="1.5" opacity="0.85" />
        <line x1="126" y1="133" x2="186" y2="136" stroke={whisker} strokeWidth="1.5" opacity="0.85" />

        {/** Patas Blancas */}
        {/** Pata Izquierda */}
        <g style={{
          transform: `translateY(${pawsUp ? '-82px' : '0px'})`,
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <ellipse cx="58"  cy="188" rx="32" ry="22" fill={white} />
          <ellipse cx="44"  cy="204" rx="11" ry="8"  fill="#d9d7d2" />
          <ellipse cx="58"  cy="208" rx="11" ry="8"  fill="#d9d7d2" />
          <ellipse cx="72"  cy="204" rx="11" ry="8"  fill="#d9d7d2" />
        </g>

        {/** Pata Derecha */}
        <g style={{
          transform: `translateY(${pawsUp ? '-82px' : '0px'})`,
          transition: 'transform 0.45s cubic-bezier(0.34, 1.56, 0.64, 1)',
        }}>
          <ellipse cx="142" cy="188" rx="32" ry="22" fill={white} />
          <ellipse cx="128" cy="204" rx="11" ry="8"  fill="#d9d7d2" />
          <ellipse cx="142" cy="208" rx="11" ry="8"  fill="#d9d7d2" />
          <ellipse cx="156" cy="204" rx="11" ry="8"  fill="#d9d7d2" />
        </g>
      </svg>

      <p className="text-white/70 text-sm text-center mt-2 font-medium">{label}</p>
    </div>
  );
}

export default function LoginView() {

  const [focusField, setFocusField] = useState<FocusField>(null)

  const initialValues: UserLoginForm = {
    email: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors }, control } = useForm({ defaultValues: initialValues })

  const emailValue = useWatch({control, name: 'email'})

  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['user']})
      navigate('/')
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData)

  return (
    <>
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white">Iniciar Sesión</h1>
      <p className="text-base sm:text-lg lg:text-2xl font-light text-white/80 mt-5">
        Comienza a plenear tus proyectos {''}
        <span className="text-gradient-primary font-bold"> iniciando sesión en este formulario</span>
      </p>

      <form
        onSubmit={handleSubmit(handleLogin)}
        className="glass-panel space-y-6 sm:space-y-8 p-6 sm:p-10 mt-8 relative "
        noValidate
      >
        {/** Gato Animado */}
        <div className="flex justify-center mb-6 h-36 items-center">
          <CatFace focusField={focusField} emailValue={emailValue ?? ''} />
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-semibold text-lg sm:text-xl text-white"
          >Email</label>

          <input
            id="email"
            type="email"
            placeholder="Email de Registro"
            className="input-modern w-full p-3 sm:p-3 text-sm sm:text-base"
            {...register("email", {
              required: "El Email es obligatorio",
              pattern: {
                value: /\S+@\S+\.\S+/,
                message: "E-mail no válido",
              },
            })}
            onFocus={() => setFocusField('email')}
              onBlur={() => {
                setTimeout(() => {
                  if (document.activeElement?.id !== 'password') {
                    setFocusField(null);
                  }
                }, 100);
              }}
          />
          {errors.email && (
            <ErrorMessage>{errors.email.message}</ErrorMessage>
          )}
        </div>

        <div className="flex flex-col gap-5">
          <label
            className="font-semibold text-lg sm:text-xl text-white"
          >Contraseña</label>

          <input
            id='password'
            type="password"
            placeholder="Contraseña de Registro"
            className="input-modern w-full p-3 sm:p-3 text-sm sm:text-base text-white"
            {...register("password", {
              required: "El Password es obligatorio",
            })}
            onFocus={() => setFocusField('password')}
              onBlur={() => {
                setTimeout(() => {
                  if (document.activeElement?.id !== 'email') {
                    setFocusField(null);
                  }
                }, 100);
              }}
          />
          {errors.password && (
            <ErrorMessage>{errors.password.message}</ErrorMessage>
          )}
        </div>

        <input
          type="submit"
          value='Iniciar Sesión'
          className="btn-primary w-full p-3 sm:p-4 text-white font-black text-base sm:text-lg lg:text-xl cursor-pointer"
        />
      </form>

      <nav className="mt-10 flex flex-col space-y-4">
        <Link
          to={'/auth/register'}
          className="text-center text-white/70 hover:text-white font-normal text-sm sm:text-base transition-colors"
        >
          ¿No tienes una cuenta? <span className="text-gradient-primary font-bold">Crear Una</span>
        </Link>

        <Link
          to={'/auth/forgot-password'}
          className="text-center text-white/70 hover:text-white font-normal text-sm sm:text-base transition-colors"
        >
          ¿Olvidaste tu contraseña? <span className="text-gradient-primary font-bold">Reestablecer</span>
        </Link>
      </nav>
    </>
  )
}