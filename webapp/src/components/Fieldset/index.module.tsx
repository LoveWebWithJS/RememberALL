import { type FormikProps } from 'formik';

export const Fieldset = ({
  legend,
  name,
  className,
  inputsArr,
}: {
  legend: string;
  name: string;
  className: string;
  inputsArr: Record<any, any>;
}) => {
  return (
    <fieldset className={className}>
      <legend>{legend}</legend>
      {inputsArr.map((input: any, i: number) => (
        <div key={i}>
          <input type='radio' id={input.name} name={name} value={input.name} />
          <label htmlFor={input.name}>{input.name}</label>
        </div>
      ))}
    </fieldset>
  );
};
