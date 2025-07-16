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
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
  placeholder: string;
}) => {
  const value = formik.values[name];
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];
  const isLabelExist = Boolean(labelText);

  return (
    <div className={className}>
      {isLabelExist ? <label htmlFor={name}>{labelText}</label> : null}
      <textarea
        disabled={formik.isSubmitting}
        onChange={(e) => {
          void formik.setFieldValue(name, e.target.value);
        }}
        onBlur={() => {
          void formik.setFieldTouched(name);
        }}
        value={value}
        name={name}
        id={name}
        autoComplete={autocomplete || 'off'}
        placeholder={placeholder || ''}
      />
      {touched && !!error && !!formik.submitCount && <div>{error}</div>}
    </div>
  );
};
