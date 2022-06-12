import React from 'react';

function Zandle(props: any) {
  if (props.index === 0) {
    return (
      <span
        className="text-7xl text-center align-middle"
        role="img"
        aria-label="zora-moon-left"
      >
        🌜
      </span>
    );
  } else {
    return (
      <span
        className="text-7xl text-center align-middle"
        role="img"
        aria-label="zora-moon-right"
      >
        🌛
      </span>
    );
  }
}

export default Zandle;
