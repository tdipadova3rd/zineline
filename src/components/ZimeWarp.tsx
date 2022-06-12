import React from 'react';
import Slider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

interface IProps {
  min: number;
  max: number;
  value: number;
  onSliderChange: (value: number) => void;
}

export default function ZimeWarp(props: IProps) {
  return (
    <div className="relative">
      <label>Value: </label>
      <p>{props.value}</p>

      <Slider
        className="center"
        defaultValue={props.max}
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
      />
      <h3>This is the zimewarp.</h3>
    </div>
  );
}
