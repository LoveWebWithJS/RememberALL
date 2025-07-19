import { type FormikProps } from 'formik';

interface importancesArrTypes {
  name: string;
  value: string;
}

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
  inputsArr: Array<importancesArrTypes>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  formik: FormikProps<any>;
}) => {
  const error = formik.errors[name] as string | undefined;
  const touched = formik.touched[name];

  return (
    <>
      <fieldset className={className}>
        <legend>{legend}</legend>
        {inputsArr.map((input: importancesArrTypes, i: number) => (
          <div key={i}>
            <input
              disabled={formik.isSubmitting}
              type='radio'
              id={input.name}
              name={name}
              value={input.value}
              onChange={(e) => {
                void formik.setFieldValue(name, e.target.value);
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
