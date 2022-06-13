import React, { useState } from 'react';

interface IProps {
  zaddress: string;
  updateZaddress: Function;
}

export default function Zaddress(props: IProps) {
  const [text, setText] = useState(props.zaddress);
  return (
    <input
      type="text"
      placeholder={text}
      onChange={(e) => setText(e.target.value)}
      onKeyUp={(event) => {
        if (event.key === 'Enter') {
          event.preventDefault();
          props.updateZaddress(text);
        }
      }}
      onSubmit={(e) => e.preventDefault()}
    />
  );
}
