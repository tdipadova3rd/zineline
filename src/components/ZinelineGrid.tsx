import React from 'react';
import Zineline from './Zineline';

interface IProps {
  onZinelineUpdate: (value: number[]) => void;
}

export default function ZinelineGrid(props: IProps) {
  return (
    <div className="container mx-auto bg-green-300  overflow-y-auto">
      <ol className="list-none">
        <li>
          <Zineline
            min={0}
            max={100}
            value={[20, 40]}
            onSliderChange={props.onZinelineUpdate}
          />
        </li>
        <li>
          <Zineline
            min={0}
            max={100}
            value={[20, 40]}
            onSliderChange={props.onZinelineUpdate}
          />
        </li>
      </ol>
    </div>
  );
}
