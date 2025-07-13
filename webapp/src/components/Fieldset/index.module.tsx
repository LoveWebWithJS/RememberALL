import { type FormikProps } from 'formik';

export const Fieldset = ({
  legend,
  name,
  className,
  inputsArr,
  formik,
}: {
  legend: string;
  name: string;
  className: string;
  inputsArr: Record<any, any>;
  formik: FormikProps<any>;
}) => {
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <>
      <fieldset className={className}>
        <legend>{legend}</legend>
        {inputsArr.map((input: any, i: number) => (
          <div key={i}>
            <input
              type='radio'
              id={input.name}
              name={name}
              value={input.value}
              onChange={(e) => {
                void formik.setFieldValue(name, Number(e.target.value));
                console.log(formik.values);
              }}
              onClick={() => {
                void formik.setFieldTouched(name);
              }}
            />
            <label htmlFor={input.name}>{input.name}</label>
          </div>
        ))}
      </fieldset>
      {!!touched && !!error && !!formik.submitCount && <div>{error}</div>}
    </>
  );
};
