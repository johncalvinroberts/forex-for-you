/** @jsx jsx */
import { useEffect, FC } from 'react';
import { jsx, css } from '@emotion/core';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useHistorical, useSystem, useWhyDidYouUpdate } from '../hooks';
import { loadHistoricalRates, getHistoricalDates } from '../store';
import { DATETIME_FORMAT } from '../constants';
import Spinner from './Spinner';
import HistoricalExchangeRateRow from './HistoricalExchangeRateRow';
import { mq } from './Theme';

const HistoricalExchangeRates: FC = ({ children }) => {
  const dispatch = useDispatch();
  const { fetchedAt, isFetching, historicalEndDate, ...rest } = useHistorical();
  const { preferredSymbols, baseCurrency } = useSystem();
  const dates = useSelector(getHistoricalDates);

  const formattedDate = fetchedAt && dayjs(fetchedAt).format(DATETIME_FORMAT);

  const tableWidth = (dates.length + 1) * 100;

  useWhyDidYouUpdate('HistoricalExchangeRates', {
    preferredSymbols,
    baseCurrency,
    isFetching,
    historicalEndDate,
    fetchedAt,
    ...rest,
  });

  useEffect(() => {
    // to decide if we should trigger a fetch of new historical data, first we have to check if our historical data is stale
    // to check if it's stale, we see if the "end date" is before yesterday (with 1 minute buffer time, otherwise it will always be stale)
    const yesterday = dayjs().subtract(1, 'day');
    const isHistoricalDataStale = dayjs(historicalEndDate).add(1, 'minute').isBefore(yesterday);
    // also, we shiuld fetch if we've never fetched
    // and we should NOT fetch if we are currently fetching
    const shouldFetch = (!fetchedAt || isHistoricalDataStale) && !isFetching;
    if (shouldFetch) {
      dispatch(loadHistoricalRates());
    }
  }, [fetchedAt, dispatch, historicalEndDate, isFetching]);

  return (
    <div
      css={css`
        min-height: 200px;
        border: solid 1px var(--muted);
        margin: var(--med) 0;
        padding: var(--med);
        color: var(--text);
        ${mq[1]} {
          border: none;
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
          Last 30 Days
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
      {/* children will probably be "HistoricalRateChart" */}
      {children}
      <div
        css={css`
          overflow: scroll;
          width: 100%;
        `}
      >
        <div
          css={css`
            padding-top: var(--med);
            width: ${tableWidth}px;
          `}
        >
          <div
            css={css`
              display: flex;
              font-size: var(--smol);
              font-weight: bold;
              border-bottom: solid 1px var(--muted);
              & > div {
                flex: 0 0 100px;
                text-align: left;
                padding: var(--med) 0;
              }
            `}
          >
            <div>CURRENCY</div>
            {dates.map((item) => (
              <div key={item}>{item}</div>
            ))}
          </div>
          {/* <HistoricalExchangeRateRow symbol={baseCurrency} /> */}
          {preferredSymbols
            .filter((item) => item !== baseCurrency)
            .map((key) => (
              <HistoricalExchangeRateRow symbol={key} key={key} />
            ))}
        </div>
      </div>
    </div>
  );
};

export default HistoricalExchangeRates;
