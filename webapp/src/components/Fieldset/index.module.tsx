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
  inputsArr: Record<string, any>;
  formik: FormikProps<any>;
}) => {
  return (
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
              void formik.setFieldValue(name, e.target.value);
            }}
          />
          <label htmlFor={input.name}>{input.name}</label>
        </div>
      ))}
    </fieldset>
  );
};
