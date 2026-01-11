import { useEffect, useState } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { Button } from '../../../catalyst-components/button';
import ReactDOM from 'react-dom';

export interface CustomNotificationProps {
  header: string;
  description: string;
  type: 'info' | 'success' | 'error';
  showTimeInMs?: number;
  onClose?: () => void;
}

export function CustomNotification({
  header,
  description,
  type,
  showTimeInMs,
  onClose,
}: CustomNotificationProps) {
  const [show, setShow] = useState<boolean>(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false);
      onClose?.();
    }, showTimeInMs);
    return () => clearTimeout(timer);
  }, [onClose, showTimeInMs]);

  const typeMap: Record<
    CustomNotificationProps['type'],
    {
      Icon: React.ComponentType<{ className: string; 'aria-hidden': boolean }>;
      colorClass: string;
    }
  > = {
    success: { Icon: CheckCircleIcon, colorClass: 'text-green-700' },
    info: { Icon: InformationCircleIcon, colorClass: 'text-yellow-600' },
    error: { Icon: ExclamationCircleIcon, colorClass: 'text-red-600' },
  };

  const { Icon, colorClass } = typeMap[type] ?? typeMap.info;

  const notification = (
    <div
      aria-live="assertive"
      className="pointer-events-none z-50 fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition show={show}>
          <div className="bg-white pointer-events-auto w-full max-w-sm rounded-xl bg-snackbar-bg-mobile lg:bg-snackbar-bg shadow-sm ring-1 ring-black/5 transition data-[closed]:data-[enter]:translate-y-2 data-[enter]:transform data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-100 data-[enter]:ease-out data-[leave]:ease-in data-[closed]:data-[enter]:sm:translate-x-2 data-[closed]:data-[enter]:sm:translate-y-0">
            <div className="p-4">
              <div className="flex items-start">
                <div className="shrink-0">
                  <Icon aria-hidden={true} className={`size-6 ${colorClass}`} />
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-medium text-text-dialog">
                    {header}
                  </p>
                  <p className="mt-1 text-sm text-text">{description}</p>
                </div>
                <div className="ml-4 flex shrink-0">
                  <Button
                    className="cursor-pointer"
                    plain
                    onClick={() => {
                      setShow(false);
                    }}
                  >
                    <XMarkIcon aria-hidden="true" className="size-5" />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  );

  return ReactDOM.createPortal(notification, document.body);
}
