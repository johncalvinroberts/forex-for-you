/** @jsx jsx */
import { FC, useState, useEffect, useCallback, useRef } from 'react';
import { jsx, css } from '@emotion/core';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { ALL_SYMBOLS } from '../constants';
import { useSystem } from '../hooks';
import {
  setRefreshInterval,
  setBaseCurrency,
  setPreferredSymbols,
  resetCurrenciesState,
} from '../store';
import { Button, Field, mq } from '../components';

const Settings: FC = () => {
  const [formPreferredSymbols, setFormPreferredSymbols] = useState([]);
  const { baseCurrency, preferredSymbols, refreshInterval } = useSystem();
  const dispatch = useDispatch();
  const baseCurrencyRef = useRef<HTMLSelectElement>();
  const refreshIntervalRef = useRef<HTMLInputElement>();

  useEffect(() => {
    setFormPreferredSymbols(preferredSymbols);
  }, [preferredSymbols]);

  const handleChangeSymbol = useCallback(
    (event) => {
      const {
        target: { checked, name },
      } = event;
      let nextFormPreferredSymbols;
      if (checked && !preferredSymbols.includes(name)) {
        nextFormPreferredSymbols = [...formPreferredSymbols, name];
      } else {
        nextFormPreferredSymbols = formPreferredSymbols.filter((item) => item !== name);
      }
      setFormPreferredSymbols(nextFormPreferredSymbols);
    },
    [setFormPreferredSymbols, preferredSymbols, formPreferredSymbols],
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const nextBaseCurrency = baseCurrencyRef.current.value;
    const nextRefreshInterval = parseInt(refreshIntervalRef.current.value);
    dispatch(setBaseCurrency(nextBaseCurrency));
    dispatch(setRefreshInterval(nextRefreshInterval));
    dispatch(setPreferredSymbols(formPreferredSymbols));
    const shouldResetHistoricalData = formPreferredSymbols.some(
      (item) => !preferredSymbols.includes(item),
    );

    if (shouldResetHistoricalData) {
      dispatch(resetCurrenciesState());
    }
    toast.success('Updated Settings');
  };

  return (
    <div
      css={css`
        min-height: 400px;
        border: solid 1px var(--muted);
        align-items: center;
        display: flex;
        justify-content: center;
        margin: var(--med) 0;
        padding: var(--med);
        ${mq[1]} {
          border: none;
          padding-bottom: calc(var(--med) + 60px);
          padding-top: 0;
        }
      `}
    >
      <form
        onSubmit={handleSubmit}
        css={css`
          width: 100%;
        `}
      >
        <h3>Settings</h3>
        <Field>
          <label htmlFor="refreshInterval">Refresh Interval</label>
          <input
            type="number"
            id="refreshInterval"
            name="refreshInterval"
            min="0"
            required
            defaultValue={refreshInterval}
            ref={refreshIntervalRef}
          />
          ms
        </Field>
        <Field>
          <label htmlFor="baseCurrency">Base Currency</label>
          <select
            name="baseCurrency"
            id="baseCurrency"
            defaultChecked={baseCurrency}
            ref={baseCurrencyRef}
          >
            {ALL_SYMBOLS.map(({ symbol, label }) => (
              <option value={symbol} key={symbol}>
                {label}
              </option>
            ))}
          </select>
        </Field>
        <Field>
          <label>Preferred Currencies</label>
          <div
            css={css`
              display: flex;
              flex-wrap: wrap;
            `}
          >
            {ALL_SYMBOLS.map(({ symbol, label }) => (
              <div
                key={symbol}
                css={css`
                  padding: var(--xsmol);
                  flex: 0 0 300px;
                `}
              >
                <input
                  type="checkbox"
                  id={symbol}
                  name={symbol}
                  checked={formPreferredSymbols.includes(symbol)}
                  onChange={handleChangeSymbol}
                  css={css`
                    margin-right: var(--xsmol);
                  `}
                />
                <label htmlFor={symbol}>
                  {label}({symbol})
                </label>
              </div>
            ))}
          </div>
        </Field>
        <Button
          css={css`
            ${mq[1]} {
              position: fixed;
              height: 60px;
              left: 0;
              right: 0;
              bottom: 0;
              text-align: center;
              width: 100%;
            }
          `}
        >
          Save
        </Button>
      </form>
    </div>
  );
};

export default Settings;
