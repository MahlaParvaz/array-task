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
  type = 'text',
  required = false,
  validationSchema,
  errors,
  onChange,
}: TextFieldProps) => {
  return (
    <div className="text-field">
      <label className="text-field__label" htmlFor={name}>
        {label}
      </label>
      <input
        {...register(name, {
          ...validationSchema,
          min: { value: 1, message: 'مقدار ورودی باید حداقل تا عدد 3 باشد.' },
          max: {
            value: 19,
            message: 'مقدار ورودی باید حداکثر تا عدد 19 باشد.',
          },
        })}
        id={name}
        name={name}
        className="text-field__input"
        type={type}
        autoComplete="off"
        onChange={onChange}
      />
      {errors && errors[name] && (
        <span className="text-field__error"> {errors[name]?.message}</span>
      )}
    </div>
  );
};

export default TextField;
