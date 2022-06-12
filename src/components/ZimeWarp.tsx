import React from 'react';
import Slider, { Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';

export interface ZimeWarpState {
  min: number;
  max: number;
  value: number;
}

class ZimeWarp extends React.Component<{}, ZimeWarpState> {
  constructor(props: any) {
    super(props);
    this.state = {
      min: 0,
      max: 100,
      value: 90
    };
  }

  onSliderChange = (value: any) => {
    console.log(value);
    this.setState({
      value
    });
  };

  render() {
    return (
      <div className="relative">
        <label>Value: </label>
        <p>{this.state.value}</p>

        <Slider
          className="center"
          defaultValue={90}
          min={this.state.min}
          max={this.state.max}
          onChange={this.onSliderChange}
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
}

export default ZimeWarp;
