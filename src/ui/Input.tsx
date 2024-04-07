import React from 'react';
import { FieldErrors, RegisterOptions, UseFormRegister } from 'react-hook-form';

type FormFieldErrors = FieldErrors<{
  errors: string;
}>;
interface TextFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  register: UseFormRegister<any>;
  type?: string;
  required?: boolean;
  validationSchema?: RegisterOptions;
  errors?: FormFieldErrors;
}

const TextField: React.FC<TextFieldProps> = ({
  label,
  name,
  register,
  type = 'number',
  required = false,
  validationSchema,
  errors,
  onChange,
}: TextFieldProps) => {
  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={name}>
        {label}
        {required && <span className="text-field__required">*</span>}
      </label>
      <input
        {...register(name, validationSchema)}
        id={name}
        name={name}
        className="text-field__input"
        type={type}
        autoComplete="off"
        onChange={onChange}
        min={1}
        max={39}
      />
      {errors && errors[name] && (
        <span className="text-field__error"> {errors[name]?.message}</span>
      )}
    </div>
  );
};

export default TextField;
