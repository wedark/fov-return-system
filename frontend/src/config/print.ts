export const settings = {
  appearAsMediaPrint:
    typeof localStorage === 'undefined' ? false : localStorage.getItem('print') === 'true',

  // appearAsMediaPrint: false,
};