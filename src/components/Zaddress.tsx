import React from 'react';

interface IProps {
  zaddress: string;
  updateZaddress: Function;
  updateInitialData: Function;
}

export default function Zaddress(props: IProps) {
  return (
    <input
      type="text"
      placeholder={props.zaddress}
      onChange={(e) => props.updateZaddress(e.target.value)}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          props.updateInitialData();
        }
      }}
    />
  );
}
