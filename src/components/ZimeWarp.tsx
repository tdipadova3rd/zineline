import React from 'react';
import { Text, Stat, Box } from 'degen';
import Slider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

const handleStyles: React.CSSProperties = {
  position: 'relative',
  width: '100px',
  height: '100px',
  top: '-25px',
  textAlign: 'center',
  backgroundColor: 'transparent',
  border: 'transparent'
};

const railStyle: React.CSSProperties = {
  backgroundColor: '#ffcccb',
  height: '10px',
};

const trackStyle: React.CSSProperties = {
  backgroundColor: '#CBC3E3',
  height: '10px',
};

const sliderStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
}

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
        railStyle={railStyle}
        trackStyle={trackStyle}
        style={sliderStyle}
      />
    </Box>
  );
}
