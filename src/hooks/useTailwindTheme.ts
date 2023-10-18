// @ts-ignore
import originalTheme from '@/../tailwind.config.js';
import { useMemo } from 'react';

export const useTailwindTheme = () => {
  return useMemo(() => {
    const theme = originalTheme.theme;
    return {
      theme: theme,
      colors: theme.extend.colors,
      borderWidth: theme.extend.borderWidth,
      fontFamily: theme.fontFamily,
    };
  }, []);
};
