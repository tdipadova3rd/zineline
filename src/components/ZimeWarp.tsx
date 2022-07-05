import React from 'react';
import { Text, Stat, Box } from 'degen';
import Slider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

const handleStyles: React.CSSProperties = {
  position: 'relative',
  // transform: 'translate(-50%, -50%)',
  width: '100px',
  height: '100px',
  top: '-25px',
  left: '-25px',
  backgroundColor: 'transparent',
  border: 'transparent'
};

interface IProps {
  min: number;
  max: number;
  value: number;
  onSliderChange: (value: number) => void;
}

export default function ZimeWarp(props: IProps) {
  return (
    <Box marginX={'10'}>
      <Stat label="Current Block" value={props.value} meta="Ethereum Mainnet" />
      <Text>Drag to update the current block (coming soon).</Text>
      <Slider
        className="center"
        defaultValue={props.max}
        disabled={true}
        min={props.min}
        max={props.max}
        onChange={props.onSliderChange}
        handle={(handleProps) => {
          return (
            <Handle {...handleProps}>
              <span
                className="text-7xl text-center align-middle"
                role="img"
                aria-label="zora-moon-left"
              >
                🌞
              </span>
            </Handle>
          );
        }}
        handleStyle={handleStyles}
      />
    </Box>
  );
}
