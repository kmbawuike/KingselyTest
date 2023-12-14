import React from 'react'
interface InputProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label: string
  name: string
  placeholder?: string
  formik?: any
}
export default function Input({ label, name, placeholder, formik, ...others }: InputProps) {
  return (
    <div>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-200 focus:border-primary-200 block w-full p-[11px] w-full block"
        placeholder={placeholder}
        {...others}
      />
      {formik && formik?.touched[name] && formik?.errors[name] && (
        <p className="text-xs italic text-red-400">{formik.errors[name]}</p>
      )}
    </div>
  )
}
