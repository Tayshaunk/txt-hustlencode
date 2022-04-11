import { hncColorTheme } from '../constants/localstorage.constants';

/**
 * Returns the user's current color theme
 * 1. Check if user a theme set in storage.
 * 2. if no theme in storage, check user system for theme
 * @returns
 *  - 'light' || 'dark'
 */
export const getTheme = (): ColorTheme => {
  // check if we have theme stored in storage
  if (localStorage[hncColorTheme]) {
    // check if localstorage is either 'light' or 'dark'
    if (localStorage[hncColorTheme] === 'light' || localStorage[hncColorTheme] === 'dark') {
      // return the local storage theme
      return localStorage[hncColorTheme];
    }
  }

  // if there is no theme in storage, check if users system theme is set to 'dark'
  const systemDarkModeEnabled: boolean = window.matchMedia('(prefers-color-scheme: dark)').matches;

  // returns dark mode
  if (systemDarkModeEnabled) return 'dark';

  // returns light mode by deafult
  return 'light';
};
