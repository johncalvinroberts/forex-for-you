/** @jsx jsx */
import { FC } from 'react';
import { css, jsx } from '@emotion/core';

const Flex: FC = ({ children, ...props }) => (
  <div
    {...props}
    css={css`
      align-items: center;
      display: flex;
      justify-content: center;
    `}
  >
    {children}
  </div>
);

export default Flex;
