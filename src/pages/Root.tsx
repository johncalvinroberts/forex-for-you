/** @jsx jsx */
import { FC } from 'react';
import { jsx, css } from '@emotion/core';
import { HistoricalExchangeRates, LatestExchangeRates, HistoricalRatesChart } from '../components';
import { useDimensions } from '../hooks';

const Root: FC = () => {
  const [boxRef, { width }] = useDimensions();
  return (
    <div>
      <div
        css={css`
          min-height: 400px;
          border: solid 1px var(--muted);
          margin-bottom: var(--med);
          align-items: center;
          display: flex;
          width: 100%;
          justify-content: center;
          padding: var(--smol);
        `}
      >
        <div
          ref={boxRef}
          css={css`
            height: 100%;
            width: 100%;
            flex: 0 0 100%;
          `}
        >
          <HistoricalRatesChart width={width} height={400} />
        </div>
      </div>
      <LatestExchangeRates />
      <HistoricalExchangeRates />
    </div>
  );
};

export default Root;
