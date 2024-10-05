/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const primary = '#fff';
const secondaryFocus = '#fcba03';
const unFocus = '#fff';
const backgroundLight = '#32a852';
const backgroundDark = '#fff';
const overflow = 'rgba(240, 240, 240, 0.9)';

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