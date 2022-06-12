import React from 'react';

interface IProps {
  zortfolioValue: number;
}

export default function ZortfolioMetrics({ zortfolioValue }: IProps) {
  return <p>Total portfolio value: {zortfolioValue}</p>;
}
