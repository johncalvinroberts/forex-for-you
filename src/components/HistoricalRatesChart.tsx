import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { useHistorical, useSystem } from '../hooks';

const colors = ['#82ca9d', '#FF4848', '#a920ff', '#4dff20', '#284670', '#A5E1FA', '#17a2b8'];

const HistoricalRatesChart = ({ width, height }) => {
  console.log({ width, height });
  const { historical } = useHistorical();
  const { preferredSymbols } = useSystem();
  const symbolsWithColors = preferredSymbols.map((item, index) => ({
    symbol: item,
    color: colors[index],
  }));
  const data = Object.keys(historical).map((date) => ({ date, ...historical[date] }));

  return (
    <LineChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 5,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
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
