/** @jsx jsx */
import { useState, useRef, FC, MouseEvent, Fragment } from 'react';
import { jsx, css } from '@emotion/core';
import { useSelector } from 'react-redux';
import { getSymbolHistoricalData } from '../store';
import Modal from './Modal';
import Button from './Button';
import Field from './Field';

const isEqual = (prevState, nextState): boolean => {
  return nextState.currencies.historicalFetchedAt === prevState.currencies.historicalFetchedAt;
};

const DateItem = ({ value, date, symbol, baseValue }) => {
  return (
    <div
      css={css`
        font-size: var(--smol);
        text-align: left;
        padding: var(--smol) 0;
        flex: 0 0 100px;
        color: var(--text);
      `}
      title={`Value of ${symbol} on ${date}: ${value}`}
    >
      {value * baseValue}
    </div>
  );
};

type Props = { symbol: string };

const HistoricalExchangeRateRow: FC<Props> = ({ symbol }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [baseValue, setBaseValue] = useState(1);
  const inputRef = useRef<HTMLInputElement>();
  const historicalData = useSelector((state) => getSymbolHistoricalData(symbol, state), isEqual);

  const handleClickRow = () => {
    setIsOpen(true);
  };

  const handleClose = (e: MouseEvent<HTMLDivElement | HTMLButtonElement>) => {
    e.stopPropagation();
    const nextBaseValue = parseInt(inputRef.current.value);
    if (baseValue !== nextBaseValue && !isNaN(nextBaseValue)) {
      setBaseValue(nextBaseValue);
    }
    setIsOpen(false);
  };

  return (
    <div
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
      onClick={handleClickRow}
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
            color: var(--text);
            font-size: var(--med);
            font-weight: bold;
          `}
        >
          {symbol} x {baseValue}
        </span>
      </div>
      {historicalData.map(([date, value]) => (
        <DateItem value={value} key={date} date={date} symbol={symbol} baseValue={baseValue} />
      ))}
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Fragment>
          <div>
            <h2>Change Base Value</h2>
            <Field>
              <input type="number" min={1} ref={inputRef} defaultValue={baseValue} />
            </Field>
          </div>
          <div
            css={css`
              display: flex;
              justify-content: flex-end;
            `}
          >
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Fragment>
      </Modal>
    </div>
  );
};

export default HistoricalExchangeRateRow;
