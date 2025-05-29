/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = '#344639';
const tintColorDark = '#fff';

export const Colors = {
  light: {
    text: '#d4d4d4',
    background: '#434E43',
    tint: tintColorLight,
    icon: '#687076',
    tabIconDefault: '#687076',
    tabIconSelected: tintColorLight,
    border: '#344640',
    fontFamily: 'Anton',
    highlight: "rgb(217, 210, 90)"
  },
  dark: {
    text: '#ECEDEE',
    background: '#434E43',
    tint: tintColorDark,
    icon: '#9BA1A6',
    tabIconDefault: '#9BA1A6',
    tabIconSelected: tintColorDark,
  },
};
