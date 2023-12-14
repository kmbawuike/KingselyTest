import React, { ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLElement> {
  title: string;
  variant?: 'outline' | 'normal'
}
export default function Button(  {title,
  variant = "normal",
  ...others
}: ButtonProps) {
  if(variant === "outline") {
  return (
    <button className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:outline-none  font-medium rounded-lg text-sm px-5 py-2 text-center me-2 mb-2" { ...others}>{title}</button>
  )}

  return (
    <button className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 focus:outline-none" { ...others}>{title}</button>
  )
}
