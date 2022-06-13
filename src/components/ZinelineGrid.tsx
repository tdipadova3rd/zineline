import React from 'react';
import { Asset } from '../types/state';
import { getAssetMapKey } from '../utils/utils';
import Zineline from './Zineline';

interface IProps {
  onZinelineUpdate: (value: number[]) => void;
  assets: Asset[];
  min: number;
  max: number;
}

export default function ZinelineGrid(props: IProps) {
  return (
    <div className="container mx-auto bg-green-300  overflow-y-auto">
      <ol className="list-none">
        {props.assets.map((asset) => {
          return (
            <li key={getAssetMapKey(asset.contractAddress, asset.tokenId)}>
              <Zineline
                min={props.min}
                max={props.max}
                value={[
                  asset.acquisition?.blockNumber || props.min,
                  asset.release?.blockNumber || props.max
                ]}
                imageUri={asset.mediaUrl || '../zorb.svg'}
                onSliderChange={props.onZinelineUpdate}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
