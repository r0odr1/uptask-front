import { Fragment } from 'react';
import { Dialog, Transition, TransitionChild, DialogPanel, DialogTitle } from '@headlessui/react';
import { statusTranslations } from '@/locales/es';
import { Task } from '@/types/index';

interface TaskHistoryModalProps {
  show: boolean;
  onClose: () => void;
  logs: Task['completedBy'];
}

export default function TaskHistoryModal({ show, onClose, logs }: TaskHistoryModalProps) {
  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="relative z-20" onClose={onClose}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/60" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white text-left align-middle shadow-xl transition-all p-8">
                <DialogTitle
                  as="h3"
                  className="font-bold text-2xl text-slate-600 my-5"
                >
                  Historial de Cambios
                </DialogTitle>

                {logs.length === 0 ? (
                  <p className="text-slate-500">No hay historial disponible.</p>
                ) : (
                  <ul className="list-decimal pl-5 space-y-2">
                    {logs.map((activity) => (
                      <li key={activity._id}>
                        <span className="font-bold text-slate-600">
                          {statusTranslations[activity.status]} por:
                        </span>{' '}
                        {activity.user.name}
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-6 text-right">
                  <button
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                    onClick={onClose}
                  >
                    Cerrar
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
