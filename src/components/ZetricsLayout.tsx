import React from 'react';
import ZinelineGrid from './ZinelineGrid';
import ZandleState from './Zineline';
import ZimeWarp from './ZimeWarp';

interface IProps {}

// need a top-level slider for time to calculate portfolio value

// need mints and sales for lower bounds (blocknumbers)
// need sales and burns for upper bounds (blocknumbers)
// need transfers for both (blocknumbers)

// need current tokens for portfolio value
//      store these tokens in a state var w/ address id and value
//      when time moves, update if these tokens are owned or not in the owned struct
//          probably want a button for this since it could be a big query

// do we actuall need all the tokens you've ever held?

// state actuall is a list of all mints, sales, burns, and transfers,
//       keyed by nft address and id - the key is actually and index, ordered by acquistion date
//       with a price for the nft at the blocknumber selected in ZimeWarp

interface IState {
  zortfolioValue: number;
  zandles: ZandleState[];
  zultiverse: boolean;
}

class ZetricsLayout extends React.Component<IProps, IState> {
  constructor(props: IProps) {
    super(props);
    this.state = {
      zortfolioValue: 0,
      zandles: [],
      zultiverse: false
    };
  }

  render() {
    return (
      <div className="container mx-auto bg-blue-300  overflow-auto">
        <input type="text" placeholder="tunadip.eth" />
        <h1>ON THE ZINELINE</h1>
        <ZimeWarp min={5} max={50} />
        <p>Total portfolio value: {this.state.zortfolioValue}</p>
        <ZinelineGrid />
        <h2>hell yeeeeeeeeaaaahhh</h2>
      </div>
    );
  }
}

export default ZetricsLayout;
