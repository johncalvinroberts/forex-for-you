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
import { Button, Field } from '../components';

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
        padding: var(--smol);
      `}
    >
      <form onSubmit={handleSubmit}>
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
          {ALL_SYMBOLS.map(({ symbol, label }) => (
            <div
              key={symbol}
              css={css`
                padding: var(--xsmol);
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
              <label htmlFor={symbol}>{label}</label>
            </div>
          ))}
        </Field>
        <Button>Submit</Button>
      </form>
    </div>
  );
};

export default Settings;
