import React from 'react';
import { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Zandle from './Zandle';

export interface IProps {
  min: number;
  max: number;
  value: number[];
  onSliderChange: (value: number[]) => void;
}

function Zineline(props: IProps) {
  return (
    <div className="relative">
      <label>LowerBound: </label>
      <p>{props.value[0]}</p>
      <br />
      <label>UpperBound: </label>
      <p>{props.value[1]}</p>
      <br />
      <Range
        className="center"
        defaultValue={props.value}
        allowCross={false}
        min={props.min}
        max={props.max}
        onChange={props.onSliderChange}
        handle={(handleProps) => {
          return (
            <Handle {...handleProps}>
              <Zandle {...handleProps} />
            </Handle>
          );
        }}
      />
      <h3>This is a zineline.</h3>
    </div>
  );
}

export default Zineline;
