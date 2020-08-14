/** @jsx jsx */
import { FC } from 'react';
import { jsx, css } from '@emotion/core';
import { Flex, HistoricalExchangeRates, LatestExchangeRates } from '../components';

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
      <LatestExchangeRates />
      <HistoricalExchangeRates />
    </div>
  );
};

export default Root;
