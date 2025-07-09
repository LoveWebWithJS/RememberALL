import { type FormikProps } from 'formik';
export const Textarea = ({
  labelText,
  name,
  autocomplete,
  className,
  formik,
  placeholder,
}: {
  labelText: string;
  name: string;
  autocomplete?: string;
  className: string;
  formik: FormikProps<any>;
  placeholder: string;
}) => {
  const value = formik.values[name];
  const isLabelExist = Boolean(labelText);

  return (
    <div className={className}>
      {isLabelExist ? <label htmlFor={name}>{labelText}</label> : null}
      <textarea
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        value={value}
        name={name}
        id={name}
        autoComplete={autocomplete || 'off'}
        placeholder={placeholder || ''}
      />
    </div>
  );
};
