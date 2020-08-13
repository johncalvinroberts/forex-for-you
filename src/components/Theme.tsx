import React, { useMemo, FC } from 'react';
import { Global, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

const varify = (obj: unknown = {}): string[] =>
  Object.keys(obj).map((key) => `--${key}: ${obj[key]};`);

const breakpoints = [576, 768, 992, 1200];

export const mq = breakpoints.map((bp) => `@media (max-width: ${bp}px)`);

export const theme = {
  colors: {
    dark: {
      background: `hsl(230,25%,18%)`,
      muted: `hsla(230,20%,0%,20%)`,
      error: `#ff4c4c`,
      text: `hsl(210,50%,96%)`,
    },
    light: {
      background: `hsl(10,10%,98%)`,
      muted: `hsl(10,20%,94%)`,
      error: `#ff4c4c`,
      text: `hsl(10,20%,20%)`,
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

const Theme: FC = ({ children }) => {
  const colorMode = useSelector((state: RootState) => state.system.colorMode);
  const globalStyles: unknown = useMemo(() => getGlobalStyles(colorMode), [colorMode]);

  return (
    <>
      {/* @ts-ignore */}
      <Global styles={globalStyles} />
      {children}
    </>
  );
};

export default Theme;
