import React from 'react';
import Zineline from './Zineline';

class ZinelineGrid extends React.Component {
  render() {
    return (
      <div className="overflow-auto">
        <ol>
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
}

export default ZinelineGrid;
