import React from 'react';

export default function Zandle(props: any) {
  if (props.index === 0) {
    return (
      <span
        className="text-7xl text-center align-middle object-center -inset-y-25 -inset-x-25"
        role="img"
        aria-label="zora-moon-left"
      >
        🌜
      </span>
    );
  } else {
    return (
      <span
        className="text-7xl text-center align-middle object-center -inset-y-25 -inset-x-25"
        role="img"
        aria-label="zora-moon-right"
      >
        🌛
      </span>
    );
  }
}
