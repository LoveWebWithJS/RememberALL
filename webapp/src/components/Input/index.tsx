import { type FormikProps } from 'formik';

export const Input = ({
  labelText,
  name,
  autocomplete,
  className,
  formik,
  type,
  placeholder,
}: {
  labelText?: string;
  name: string;
  autocomplete?: string;
  className: string;
  formik: FormikProps<any>;
  type?: string;
  placeholder?: string;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const isLabelExist = Boolean(labelText);

  return (
    <div className={className}>
      {isLabelExist ? <label htmlFor={name}>{labelText}</label> : null}
      <input
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        value={value}
        type={type || 'text'}
        name={name}
        id={name}
        autoComplete={autocomplete || 'off'}
        placeholder={placeholder || ''}
      />
      {error && <div>{error}</div>}
    </div>
  );
};
