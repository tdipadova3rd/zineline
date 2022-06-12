import React from 'react';
import Zineline from './Zineline';

export default function ZinelineGrid() {
  return (
    <div className="container mx-auto bg-green-300  overflow-y-auto">
      <ol className="list-none">
        <li>
          <Zineline />
        </li>
        <li>
          <Zineline />
        </li>
      </ol>
    </div>
  );
}
