/** @jsx jsx */
import { createContext, useContext, useMemo, useCallback, FC } from 'react';
import { Global, css, jsx } from '@emotion/core';
import { COLOR_MODE_KEY } from '../constants';
import { usePersistentState } from '../hooks';

const varify = (obj: unknown = {}): string[] =>
  Object.keys(obj).map((key) => `--${key}: ${obj[key]};`);

const breakpoints = [576, 768, 992, 1200];

export const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const theme = {
  colors: {
    dark: {
      background: `#252424`,
      muted: `hsla(0, 1%, 10%, 1)`,
      error: `#ff4c4c`,
      text: `hsl(210, 50%, 96%)`,
    },
    light: {
      background: `hsl(210, 50%, 96%)`,
      muted: `#c1c1c1`,
      error: `#ff4c4c`,
      text: `#252424`,
    },
  },
  fonts: {
    body: `inter, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif`,
  },
  fontWeights: {
    body: 400,
    heading: 700,
    display: 900,
  },
  lineHeights: {
    body: 1.5,
  },
  space: {
    xsmol: '0.5rem',
    smol: '1rem',
    menutext: '1.2rem',
    med: '1.4rem',
    lrg: '2rem',
    xlrg: '2.5rem',
  },
};

const getGlobalStyles: any = (colorMode: string) => css`
  html {
    font-size: 10px;
  }
  * {
    margin: 0;
    padding: 0;
    border: 0;
    outline: 0;
  }
  :root {
    ${varify(theme.colors[colorMode])}
    ${varify(theme.space)}
  }
  ::selection {
    background: var(--muted);
  }
  body {
    background-color: var(--background);
    font-family: ${theme.fonts.body};
    font-size: var(--med);
    color: var(--text);
  }
`;

const ThemeContext = createContext({});

export const useTheme: unknown = () => useContext(ThemeContext);

const modes = {
  dark: 'dark',
  light: 'light',
};

const Theme: FC = ({ children }) => {
  const [colorMode, setColorMode] = usePersistentState(COLOR_MODE_KEY, modes.light);
  const toggleColorMode = useCallback(() => {
    const { light, dark } = modes;
    const nextColorMode = colorMode === dark ? light : dark;

    setColorMode(nextColorMode);
  }, [colorMode, setColorMode]);

  /* eslint-disable */
  const globalStyles: unknown = useMemo(() => getGlobalStyles(colorMode), [colorMode]);
  return (
    <ThemeContext.Provider value={{ setColorMode, colorMode, toggleColorMode }}>
      {/* @ts-ignore */}
      <Global styles={globalStyles} />
      {children}
    </ThemeContext.Provider>
  );
  /* eslint-enable */
};

export default Theme;
