// import useLocalStorage from 'use-local-storage';
// import './DarkModeButton';
// import Theme from './Theme/Theme';
// const DarkModeButton = () => {
//   const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

//   const switchTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//   };

//   return <button onClick={switchTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</button>;
// };

// export default DarkModeButton;

// export default () => {
//   const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
//   const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

//   const switchTheme = () => {
//     const newTheme = theme === 'light' ? 'dark' : 'light';
//     setTheme(newTheme);
//   };

//   return [theme];
// };
