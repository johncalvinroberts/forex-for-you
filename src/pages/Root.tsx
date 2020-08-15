/** @jsx jsx */
import { FC, Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import {
  HistoricalExchangeRates,
  LatestExchangeRates,
  HistoricalRatesChart,
  mq,
} from '../components';
import { useDimensions } from '../hooks';

const Root: FC = () => {
  const [boxRef, { width }] = useDimensions();
  return (
    <Fragment>
      <LatestExchangeRates />
      <HistoricalExchangeRates>
        <div
          css={css`
            min-height: 400px;
            align-items: center;
            display: flex;
            width: 100%;
            justify-content: center;
            padding: var(--smol) 0;
            ${mq[1]} {
              padding-bottom: var(--med);
            }
          `}
          ref={boxRef}
        >
          <HistoricalRatesChart width={width} height={400} />
        </div>
      </HistoricalExchangeRates>
    </Fragment>
  );
};

export default Root;
