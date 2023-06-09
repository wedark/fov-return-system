export const settings = {
  appearAsMediaPrint:
    typeof localStorage === 'undefined' ? false : localStorage.getItem('print') === 'true',

  // appearAsMediaPrint: false,
};
// console.log('settings', settings);

// window.settings = settings;

// export const appearAsMediaPrint = true;
