import React, { ReactNode } from 'react'

type ModalProps = {
  open : boolean;
  close: ()=> void;
  title: string;
  children: ReactNode;
  width?: string
}

export default function Modal({open, close, title, width = 'max-w-[500px]', children}: ModalProps) {
  return open ? (

<div className="fixed inset-0 z-[9] flex h-screen bg-[rgba(0,0,0,0.4)] duration-300">
<div className="flex h-screen w-full items-center justify-center">
  <div
    className={`relative w-[95%] ${width}  overflow-auto rounded-[16px] bg-white p-4`}
  >
    {close && (
      <div
        className="absolute right-2 top-2 cursor-pointer"
        onClick={close}
      >
       <button
            type="button"
            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
           onClick={close}
          >
            <svg
              aria-hidden="true"
              className="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
            <span className="sr-only">Close modal</span>
          </button>
      </div>
    )}
    <section className="mt-2">{children}</section>
  </div>
</div>
</div>
  ) : null
}
