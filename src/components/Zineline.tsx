import React from 'react';
import { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Zandle from './Zandle';

export interface IProps {
  min: number;
  max: number;
  value: number[];
  imageUri: string;
  onSliderChange: (value: number[]) => void;
}

export default function Zineline(props: IProps) {
  return (
    <div className="relative">
      <label>LowerBound: </label>
      <p>{props.value[0]}</p>
      <br />
      <label>UpperBound: </label>
      <p>{props.value[1]}</p>
      <br />
      <img src={props.imageUri} width={50} height={50} alt="NFT" />
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
