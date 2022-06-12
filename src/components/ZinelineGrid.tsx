import React from 'react';
import Zineline from './Zineline';

class ZinelineGrid extends React.Component {
  render() {
    return (
      <div className="container mx-auto bg-green-300  overflow-auto">
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
}

export default ZinelineGrid;
