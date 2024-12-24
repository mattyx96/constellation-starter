// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import originalTheme from '../../tailwind.config.cjs';
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
