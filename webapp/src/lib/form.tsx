import { type FormikHelpers, useFormik } from 'formik';
import { withZodSchema } from 'formik-validator-zod';
import { useState } from 'react';
import { type z } from 'zod';
// import { type ButtonProps } from '../components/Button';

export const useForm = <TZodSchema extends z.ZodTypeAny>({
  resetOnSuccess = true,
  initialValues = {},
  validationSchema,
  onSubmit,
}: {
  successMessage?: string | false;
  resetOnSuccess?: boolean;
  showValidationAlert?: boolean;
  initialValues?: z.infer<TZodSchema>;
  validationSchema?: TZodSchema;
  onSubmit: (
    values: z.infer<TZodSchema>,
    actions: FormikHelpers<z.infer<TZodSchema>>
  ) => Promise<any> | any;
}) => {
  const [, setSubmittingError] = useState<Error | null>(null);

  const formik = useFormik<z.infer<TZodSchema>>({
    initialValues,
    ...(validationSchema && { validate: withZodSchema(validationSchema) }),
    onSubmit: async (values, formikHelpers) => {
      try {
        setSubmittingError(null);
        await onSubmit(values, formikHelpers);
        if (resetOnSuccess) {
          formik.resetForm();
        }
      } catch (error: any) {
        setSubmittingError(error);
      }
    },
  });
  return {
    formik,
  };
};
