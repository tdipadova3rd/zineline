import React, { useState } from 'react';
import { Input, Box } from 'degen';

interface IProps {
  zaddress: string;
  updateZaddress: Function;
}

export default function Zaddress(props: IProps) {
  const [text, setText] = useState(props.zaddress);
  return (
    <Box marginX={'10'}>
      <Input
        label="Wallet Address"
        type="text"
        placeholder={text}
        onChange={(e) => setText(e.target.value)}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.preventDefault();
            props.updateZaddress(text);
          }
        }}
      />
    </Box>
  );
}
