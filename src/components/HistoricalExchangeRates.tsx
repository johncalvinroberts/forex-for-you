/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import dayjs from 'dayjs';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistorical, useWhyDidYouUpdate } from '../hooks';
import { loadHistoricalRates, getSystem, getHistoricalDates } from '../store';
import { DATETIME_FORMAT } from '../constants';
import Spinner from './Spinner';
import HistoricalExchangeRateRow from './HistoricalExchangeRateRow';

const HistoricalExchangeRates = () => {
  const dispatch = useDispatch();
  const { fetchedAt, isFetching, historicalEndDate, ...rest } = useHistorical();
  const { preferredSymbols, baseCurrency } = useSelector(getSystem);
  const dates = useSelector(getHistoricalDates);

  const formattedDate = fetchedAt && dayjs(fetchedAt).format(DATETIME_FORMAT);

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
    const historicalDataIsStale = dayjs(historicalEndDate).add(1, 'minute').isBefore(yesterday);
    // also, we shiuld fetch if we've never fetched
    // and we should NOT fetch if we are currently fetching
    const shouldFetch = (!fetchedAt || historicalDataIsStale) && !isFetching;
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
      <div
        css={css`
          padding-top: var(--med);
          overflow: scroll;
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
  );
};

export default HistoricalExchangeRates;
