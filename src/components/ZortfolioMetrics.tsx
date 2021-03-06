import React from 'react';
import { Card, Text, Box } from 'degen';

interface IProps {
  zortfolioValue: number;
}

export default function ZortfolioMetrics({ zortfolioValue }: IProps) {
  //   return <p>Total portfolio value: {zortfolioValue}</p>;
  return (
    <Box margin="10">
      <Card padding="3">
        <Text>
          Zineline represents every NFT you've ever held. It shows acquisition
          (mint, receipt, buy) with 🌜 and release (sale, transfer, burn) with
          🌛. Soon you will be able to change these values to experiment with
          "what-if". What if I joined the project earlier? What if I held
          longer? There will also be features to show portfolio value at various
          times. More metrics coming soon. Data not showing up or looks off?
          You're probably being rate limited.
        </Text>
      </Card>
    </Box>
  );
}
