import React from 'react';
import { Asset } from '../types/state';
import { getAssetMapKey } from '../utils/utils';
import Zineline from './Zineline';

interface IProps {
  // onZinelineUpdate: (value: number[]) => void;
  assets: Asset[];
  min: number;
  max: number;
  loading: boolean;
}

export default function ZinelineGrid(props: IProps) {
  return (
    <div>
      <ol className="list-none">
        {props.assets.map((asset) => {
          return (
            <li key={getAssetMapKey(asset.contractAddress, asset.tokenId)}>
              <Zineline
                asset={asset}
                min={props.min}
                max={props.max}
                // onSliderChange={props.onZinelineUpdate}
              />
            </li>
          );
        })}
      </ol>
    </div>
  );
}
