import React from 'react';
import { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Zandle from './Zandle';

export interface ZinelineState {
  lowerBound: number;
  upperBound: number;
  min: number;
  max: number;
  value: number[];
}

class Zineline extends React.Component<{}, ZinelineState> {
  constructor(props: any) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
      lowerBound: 20,
      upperBound: 40,
      value: [20, 40]
    };
  }

  onLowerBoundChange = (e: { target: { value: string | number } }) => {
    this.setState({ lowerBound: +e.target.value });
  };

  onUpperBoundChange = (e: { target: { value: string | number } }) => {
    this.setState({ upperBound: +e.target.value });
  };

  onSliderChange = (value: any) => {
    console.log(value);
    this.setState({
      value
    });
  };

  render() {
    return (
      <div className="relative">
        <label>LowerBound: </label>
        <p>{this.state.lowerBound}</p>
        <br />
        <label>UpperBound: </label>
        <p>{this.state.upperBound}</p>
        <br />
        <Range
          className="center"
          defaultValue={[20, 50]}
          allowCross={false}
          min={this.state.min}
          max={this.state.max}
          onChange={this.onSliderChange}
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
}

export default Zineline;
