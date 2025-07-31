import css from './index.module.scss';

export const setBtnStyle = (btnStyle: string | undefined) => {
  //this function uses for adding css class for button. String which used in props also adds class for button. You can add your new class and write styles for it in css which imports in top
  switch (btnStyle) {
    //like:
    // case 'yourStringWhichUsedInProps':
    //   return css.yourClass;
    //   break;
    case 'sync':
      return css.sync;
      break;
    case 'ligthGreen':
      return css.lightGreen;
      break;
    case 'mediumGreen':
      return css.mediumGreen;
      break;
    case 'darkGreen':
      return css.darkGreen;
      break;
    default:
      return css.lightGreen;
      break;
  }
};
