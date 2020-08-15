import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, Legend } from 'recharts';
import { useHistorical, useSystem } from '../hooks';
import { getOrderedDateKeys } from '../store';

const colors = ['#82ca9d', '#FF4848', '#a920ff', '#4dff20', '#284670', '#A5E1FA', '#17a2b8'];

const HistoricalRatesChart = ({ width, height }) => {
  const { historical } = useHistorical();
  const { preferredSymbols } = useSystem();
  const symbolsWithColors = preferredSymbols.map((item, index) => ({
    symbol: item,
    color: colors[index],
  }));
  const data = useMemo(
    () => getOrderedDateKeys(historical).map((date) => ({ date, ...historical[date] })),
    [historical],
  );

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 4,
        left: 0,
        bottom: 5,
      }}
    >
      <XAxis dataKey="date" />
      <YAxis />
      <Tooltip />
      <Legend />
      {symbolsWithColors.map(({ symbol, color }) => (
        <Line type="monotone" dataKey={symbol} stroke={color} key={symbol} activeDot={{ r: 8 }} />
      ))}
    </LineChart>
  );
};

export default HistoricalRatesChart;
