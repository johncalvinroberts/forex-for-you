/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core';

const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Spinner = () => {
  return (
    <div
      css={css`
        margin: 0 10px;
        display: inline-flex;
        width: var(--smol);
        height: var(--smol);
        border-radius: 50%;
        background: var(--text);
        background: linear-gradient(to right, var(--text) 10%, var(--background) 42%);
        position: relative;
        animation: ${spin} 1.4s infinite linear;
        transform: translateZ(0);
        &:after {
          background: var(--background);
          width: 75%;
          height: 75%;
          border-radius: 50%;
          content: '';
          margin: auto;
          position: absolute;
          top: 0;
          left: 0;
          bottom: 0;
          right: 0;
        }
        &:before {
          width: 50%;
          height: 50%;
          background: var(--text);
          border-radius: 100% 0 0 0;
          position: absolute;
          top: 0;
          left: 0;
          content: '';
        }
      `}
    ></div>
  );
};

export default Spinner;
