import React, { useEffect, useState } from 'react';
import ZinelineGrid from './ZinelineGrid';
import ZimeWarp from './ZimeWarp';
import Zonnect from './Zonnect';
import { Asset } from '../types/state';
import { useOwnSales } from '../hooks/useOwnSales';
import { useOwnTransfers } from '../hooks/useOwnTransfers';
import { useOwnReceipts } from '../hooks/useOwnReceipt';
import { useOwnBuys } from '../hooks/useOwnBuys';
import { useOwnMints } from '../hooks/useOwnMints';
import ZortfolioMetrics from './ZortfolioMetrics';

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

// state actually is a list of all mints, sales, burns, and transfers, (represented by lower/upper bound)
//       keyed by nft address and id - the key is actually an index, ordered by acquistion date
//       with a price for the nft at the blocknumber selected in ZimeWarp

// updates
// when the address is updated, everything must update
// when the nft slider moves, we only need to update portfolio value if
//      timewarp is no longer contained (never bot or sold before time)
// when the timewarp slider moves, get curr price for every nft
//      and recalculate the portfolio value

// stretch
// calculate other metrics around warping
//      how would total profit change? how would cost basis change?

interface IState {
  zaddress: string;
  zortfolioValue: number;
  zultiverse: boolean;
  zassets: Asset[]; // ordered by (real) acquisition date
  zin: number;
  zax: number;
}

export default function ZetricsLayout(props: IProps) {
  const [zaddress, setZaddress] = useState('tunadip.eth');
  const [zortfolioValue, setZortfolioValue] = useState(0);
  const [zassets, setZassets] = useState([]);
  const [zultiverse, setZultiverse] = useState(false);
  const [zin, setZin] = useState(0);
  const [zax, setZax] = useState(100);
  const [zimewarpValue, setZimewarpValue] = useState(50);

  const salesResponse = useOwnSales(zaddress);
  const transferResponse = useOwnTransfers(zaddress);
  const receiptResponse = useOwnReceipts(zaddress);
  const buyResponse = useOwnBuys(zaddress);
  const mintResponse = useOwnMints(zaddress);

  return (
    <div className="container mx-auto bg-blue-300  overflow-auto">
      <input
        type="text"
        placeholder={zaddress}
        onChange={(e) => setZaddress(e.target.value)}
        onKeyUp={(event) => {
          if (event.key === 'Enter') {
            setZaddress('new'); // needs to update data
          }
        }}
      />
      <Zonnect />
      <h1>ON THE ZINELINE</h1>
      <p>Address: {zaddress}</p>
      <ZimeWarp
        min={zin}
        max={zax}
        value={zimewarpValue}
        onSliderChange={setZimewarpValue}
      />
      <ZortfolioMetrics zortfolioValue={zortfolioValue} />
      <ZinelineGrid />
      <h2>hell yeeeeeeeeaaaahhh</h2>
    </div>
  );
}
