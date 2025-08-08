import css from './index.module.scss';

export const setAlertStyle = (alertStyle: string) => {
  //this function uses for adding css class for button. String which used in props also adds class for button. You can add your new class and write styles for it in css which imports in top
  switch (alertStyle) {
    //like:
    // case 'yourStringWhichUsedInProps':
    //   return css.yourClass;
    //   break;
    case 'green':
      return css.green;
      break;
    case 'blue':
      return css.blue;
      break;
    case 'red':
      return css.red;
      break;
  }
};
