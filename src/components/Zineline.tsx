import React from 'react';
import { Range, Handle } from 'rc-slider';
import 'rc-slider/assets/index.css';
import Zandle from './Zandle';
import { Asset } from '../types/state';

export interface IProps {
  asset: Asset;
  min: number;
  max: number;
  onSliderChange: (value: number[]) => void;
}

export default function Zineline(props: IProps) {
  const bounds = [
    props.asset.acquisition?.blockNumber || props.min,
    props.asset.release?.blockNumber || props.max
  ];

  const imageUri = props.asset.mediaUrl || '../zorb.svg';
  return (
    <div className="relative">
      <label>Purchased At: </label>
      <p>{bounds[0]}</p>
      <br />
      <label>Held Until: </label>
      <p>{bounds[1]}</p>
      <br />
      <label>Collection Name: </label>
      <p>{props.asset.collectionName}</p>
      <br />
      <label>Collection Address: </label>
      <p>{props.asset.contractAddress}</p>
      <br />
      <label>Token Name: </label>
      <p>{props.asset.name}</p>
      <br />
      <label>Token ID: </label>
      <p>{props.asset.tokenId}</p>
      <br />
      <img src={imageUri} width={50} height={50} alt="NFT" />
      <br />
      <Range
        className="center"
        defaultValue={bounds}
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
