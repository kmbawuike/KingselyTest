import type { ReactNode } from 'react';

export interface CheckboxProps
  extends React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  > {
  label?: string;
  labelComponent?: ReactNode;
  name: string;
  formik?: any;
}
const Checkbox = ({
  label,
  labelComponent,
  name = '',
  formik,
  ...others
}: CheckboxProps) => {
  return (
    <div>
      <section className="flex items-center">
        <input
          id={name}
          type="checkbox"
          className="rounded border-gray-300 bg-transparent text-dark focus:ring-2 focus:ring-transparent"
          checked={formik.values[name]}
          name={name}
          onChange={formik?.handleChange}
          {...others}
        />
        <label
          htmlFor={name}
          className="ml-2 text-sm font-light text-dark-light"
        >
          {!label ? labelComponent : label}
        </label>
      </section>
      {formik?.touched[name] && formik?.errors[name] && (
        <p className="text-xs italic text-red-400">{formik.errors[name]}</p>
      )}
    </div>
  );
};

export default Checkbox;
