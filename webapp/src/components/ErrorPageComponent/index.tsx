import { Alert } from '../Alert';

export const ErrorPageComponent = ({
  title = 'Error',
  message = 'Something went wrong =(',
}: {
  title?: string;
  message?: string;
}) => {
  return (
    <div>
      <h2>{title}</h2>
      <Alert color='red' innerText={message} />
    </div>
  );
};
