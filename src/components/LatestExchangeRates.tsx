/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useDispatch } from 'react-redux';
import dayjs from 'dayjs';
import { loadLatestRates } from '../store';
import { useInterval, useLatest, useSystem } from '../hooks';
import { DATETIME_FORMAT, SYMBOLS_DICT } from '../constants';
import Spinner from './Spinner';
import { mq } from './Theme';

const SymbolBox = ({ symbol, value }) => {
  return (
    <div
      css={css`
        padding: var(--smol);
        padding-left: 0;
      `}
    >
      <div
        css={css`
          font-size: var(--med);
          font-weight: bold;
        `}
      >
        {symbol}
      </div>
      <span
        css={css`
          font-size: var(--smol);
          font-weight: normal;
        `}
      >
        {SYMBOLS_DICT[symbol]}
      </span>
      <div>{value || <Spinner />}</div>
    </div>
  );
};

const LatestExchangeRates = () => {
  const dispatch = useDispatch();
  const { refreshInterval, preferredSymbols, baseCurrency } = useSystem();
  const { latest, fetchedAt, isFetching } = useLatest();
  const formattedDate = fetchedAt && dayjs(fetchedAt).format(DATETIME_FORMAT);

  useInterval(() => {
    dispatch(loadLatestRates());
  }, refreshInterval);

  return (
    <div
      css={css`
        border: solid 1px var(--muted);
        margin: var(--med) 0;
        padding: var(--med);
        ${mq[1]} {
          border: none;
          border-bottom: solid 1px var(--muted);
          padding-top: 0;
        }
      `}
    >
      <div
        css={css`
          display: flex;
          justify-content: flex-start;
          align-items: center;
          flex-wrap: wrap;
        `}
      >
        <h3
          css={css`
            margin-right: var(--smol);
          `}
        >
          Latest Rates
        </h3>
        <span
          css={css`
            font-size: var(--smol);
            min-width: 300px;
          `}
        >
          {fetchedAt && `Last Updated: ${formattedDate}`} {isFetching && <Spinner />}
        </span>
      </div>
      <div
        css={css`
          display: grid;
          grid-template-columns: repeat(auto-fill, 133px);
        `}
      >
        <SymbolBox symbol={baseCurrency} value={1} />
        {preferredSymbols
          .filter((item) => item !== baseCurrency)
          .map((key) => (
            <SymbolBox symbol={key} value={latest[key]} key={key} />
          ))}
      </div>
    </div>
  );
};

export default LatestExchangeRates;
