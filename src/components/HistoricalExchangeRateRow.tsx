/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { FC } from 'react';
import { useSelector } from 'react-redux';
import { getSymbolHistoricalData } from '../store';

const isEqual = (prevState, nextState): boolean => {
  return nextState.currencies.historicalFetchedAt === prevState.currencies.historicalFetchedAt;
};

const DateItem = ({ value, date, symbol }) => {
  return (
    <div
      css={css`
        font-size: var(--smol);
        text-align: left;
        padding: var(--smol) 0;
        flex: 0 0 100px;
      `}
      title={`Value of ${symbol} on ${date}: ${value}`}
    >
      {value}
    </div>
  );
};

type Props = { symbol: string };

const HistoricalExchangeRateRow: FC<Props> = ({ symbol }) => {
  const historicalData = useSelector((state) => getSymbolHistoricalData(symbol, state), isEqual);
  return (
    <button
      css={css`
        display: flex;
        padding-left: 0;
        background-color: transparent;
        margin: 0;
        cursor: pointer;
        border-bottom: solid 0.5px var(--muted);
        align-items: center;
        &:hover {
          background-color: var(--muted);
        }
      `}
      title="Inspect single exchange rate row"
    >
      <div
        css={css`
          flex: 0 0 100px;
          text-align: left;
          padding: var(--med) 0;
          position: sticky;
          left: 0;
        `}
      >
        <span
          css={css`
            padding: var(--xsmol);
            background-color: var(--background);
          `}
        >
          {symbol}
        </span>
      </div>
      {historicalData.map(([date, value]) => (
        <DateItem value={value} key={date} date={date} symbol={symbol} />
      ))}
    </button>
  );
};

export default HistoricalExchangeRateRow;
