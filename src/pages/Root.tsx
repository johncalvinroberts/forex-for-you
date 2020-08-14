/** @jsx jsx */
import { FC } from 'react';
import { jsx, css } from '@emotion/core';
import { HistoricalExchangeRates, LatestExchangeRates, HistoricalRatesChart } from '../components';
import { useDimensions } from '../hooks';

const Root: FC = () => {
  const [boxRef, { width, height }] = useDimensions();
  return (
    <div>
      <div
        css={css`
          min-height: 400px;
          border: solid 1px var(--muted);
          margin-bottom: var(--med);
          align-items: center;
          display: flex;
          justify-content: center;
          padding: var(--smol) 0;
        `}
        ref={boxRef}
      >
        <HistoricalRatesChart width={width} height={height} />
      </div>
      <LatestExchangeRates />
      <HistoricalExchangeRates />
    </div>
  );
};

export default Root;
