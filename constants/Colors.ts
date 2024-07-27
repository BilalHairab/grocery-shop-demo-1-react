/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primary = '#002d5c';
const secondaryFocus = '#ed00b8';
const unFocus = '#fff';
const backgroundLight = '#F0F0F0';
const backgroundDark = '#0f002e';
const overflow = '#AAF0F0F0';

export const Colors = {
  light: {
    primary,
    overflow,
    secondaryFocus,
    text: backgroundDark,
    unfocus: unFocus,
    background: backgroundLight,
    tint: unFocus,
    icon: backgroundDark,
    tabIconDefault: unFocus,
    tabIconSelected: secondaryFocus,
  },
  dark: {
    primary,
    overflow,
    secondaryFocus,
    text: backgroundLight,
    unfocus: unFocus,
    background: backgroundDark,
    tint: unFocus,
    icon: backgroundLight,
    tabIconDefault: unFocus,
    tabIconSelected: secondaryFocus,
  },
};

export const individualColors = {
  primary,
  secondaryFocus,
  unFocus,
  backgroundLight,
  backgroundDark,
  overflow,
}