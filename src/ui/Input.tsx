import React from 'react';

type Props = {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function TextField({
  label,
  name,
  register,
  type = 'number',
  required,
  validationSchema,
  errors,
  onChange,
}: Props) {
  return (
    <div>
      <label className="textField__label" htmlFor={name}>
        {label}
        {required && <span className="text-error">*</span>}
      </label>
      <input
        {...register(name, validationSchema)}
        id={name}
        name={name}
        className="textField__input"
        type={type}
        autoComplete="off"
        onChange={onChange}
        min={1}
        max={55}
      />
      {errors && errors[name] && (
        <span className="text-error ">{errors[name]?.message}</span>
      )}
    </div>
  );
}
