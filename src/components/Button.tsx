/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Button = ({ children, ...props }) => {
  return (
    <button
      css={css`
        background: var(--text);
        color: var(--background);
        padding: var(--xsmol) var(--smol);
        border: none;
        cursor: pointer;
        &:hover {
          opacity: 0.8;
        }
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
