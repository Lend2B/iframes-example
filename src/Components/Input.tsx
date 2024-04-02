import { useField } from "formik";
import React from "react";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export const Input = ({ name, type, label, placeholder }: Props) => {
  const [field, meta] = useField(name ?? "");

  return (
    <div className="flex flex-col gap-2 w-3/12">
      <label htmlFor={name}>{label}</label>
      <input
        className="p-2 border-2 rounded-lg border-gray-400"
        {...field}
        type={type}
        placeholder={placeholder}
      />
      {meta.touched && meta.error ? (
        <p className="text-red-500 text-xs">{meta.error}</p>
      ) : null}
    </div>
  );
};
