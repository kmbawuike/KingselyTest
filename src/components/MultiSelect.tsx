import React from 'react'
import Select from 'react-select'
import { Option } from '../type'


type MultiSelectProps = {
  options?: Option[]
  name: string
  label: string
  formik?: any
  handleChange: (val: any)=> void
}

const customStyles = {
  control: (base: any) => ({
    ...base,
    boxShadow: 'none',
    backgroundColor: "#f9fafb",
    fontSize: 14,
    borderRadius: 10
  }),
  input: (provided: any) => ({
    ...provided,
    padding: 11,
    outline: 'none',
    backgroundColor: 'inherit',
  }),
  menu: (provided: any) => ({ ...provided, zIndex: 9999 }),
};

const MultiSelect = ({ options, name, label, formik , handleChange}: MultiSelectProps) => (
  <div>
    <label
      htmlFor={name}
      className="block mb-2 text-sm font-medium text-gray-900"
    >
      {label}
    </label>
    <Select value={formik?.values[name]} options={options} isMulti styles={customStyles} onChange={(val)=> handleChange(val)} />
    {formik && formik?.touched[name] && formik?.errors[name] && (
        <p className="mt-2 text-xs italic text-red-400">
          {formik?.errors[name]}
        </p>
      )}
  </div>

)

export default MultiSelect