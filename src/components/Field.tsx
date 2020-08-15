/** @jsx jsx */
import { jsx, css } from '@emotion/core';

const Field = ({ children }) => (
  <fieldset
    css={css`
      margin: var(--smol) 0;
      & > input {
        border: solid 1px var(--muted);
        padding: var(--smol);
      }
      & > label {
        margin-right: var(--xsmol);
      }
    `}
  >
    {children}
  </fieldset>
);

export default Field;
