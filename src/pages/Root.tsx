/** @jsx jsx */
import { FC } from 'react';
import { jsx, css } from '@emotion/core';
import { Flex } from '../components';

const Root: FC = () => {
  return (
    <div>
      <Flex
        css={css`
          min-height: 200px;
          border: solid 1px var(--muted);
          margin-bottom: var(--med);
        `}
      >
        <div>chart here</div>
      </Flex>
      <div
        css={css`
          min-height: 200px;
          border: solid 1px var(--muted);
        `}
      >
        data here
      </div>
    </div>
  );
};

export default Root;
