import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { Heading, Spinner, Stack } from 'degen';
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
import Zaddress from './Zaddress';
import { calculateZorfolioValue, parseAssetBoundaries } from '../utils/utils';

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

export default function ZetricsLayout(props: IProps) {
  const [zaddress, setZaddress] = useState('tunadip.eth');
  const [zortfolioValue, setZortfolioValue] = useState(0);
  const [zassets, setZassets] = useState<Asset[]>([]);
  //   const [zultiverse, setZultiverse] = useState(false);
  const [zin, setZin] = useState(0);
  const [zax, setZax] = useState(100);
  const [zimewarpValue, setZimewarpValue] = useState(0);

  const salesResponse = useOwnSales(zaddress);
  const transferResponse = useOwnTransfers(zaddress);
  const receiptResponse = useOwnReceipts(zaddress);
  const buyResponse = useOwnBuys(zaddress);
  const mintResponse = useOwnMints(zaddress);

  useEffect(() => {
    ethers
      .getDefaultProvider('mainnet')
      .getBlockNumber()
      .then((value) => {
        setZimewarpValue(value);
        setZax(value);
      });
  }, []);

  useEffect(() => {
    if (
      !(
        salesResponse.loading ||
        transferResponse.loading ||
        receiptResponse.loading ||
        buyResponse.loading ||
        mintResponse.loading
      )
    ) {
      setZassets(
        parseAssetBoundaries(
          salesResponse.data,
          transferResponse.data,
          receiptResponse.data,
          buyResponse.data,
          mintResponse.data
        )
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    salesResponse.loading,
    transferResponse.loading,
    receiptResponse.loading,
    buyResponse.loading,
    mintResponse.loading,
    zaddress
  ]);

  useEffect(() => {
    setZin(zassets[0]?.acquisition?.blockNumber || 0);
    setZortfolioValue(calculateZorfolioValue(zassets));
  }, [zassets]);

  if (
    salesResponse.loading ||
    transferResponse.loading ||
    receiptResponse.loading ||
    buyResponse.loading ||
    mintResponse.loading
  ) {
    return (
      <div className="place-self-center">
        <Spinner size="large" />
      </div>
    );
  }
  if (
    salesResponse.error ||
    transferResponse.error ||
    receiptResponse.error ||
    buyResponse.error ||
    mintResponse.error
  ) {
    return (
      <div>
        <h1>An error occurred</h1>
      </div>
    );
  }

  return (
    <div>
      <Stack direction="horizontal" wrap={true} justify="space-between">
        <Heading responsive={true} level="1">
          ON THE ZINELINE
        </Heading>
        <Zonnect />
      </Stack>
      <Zaddress zaddress={zaddress} updateZaddress={setZaddress} />

      <ZimeWarp
        min={zin}
        max={zax}
        value={zimewarpValue}
        onSliderChange={setZimewarpValue}
      />
      <ZortfolioMetrics zortfolioValue={zortfolioValue} />
      <ZinelineGrid
        assets={zassets}
        min={zin}
        max={zax}
        loading={
          salesResponse.loading ||
          transferResponse.loading ||
          receiptResponse.loading ||
          buyResponse.loading ||
          mintResponse.loading
        }
        // onZinelineUpdate={(val) => console.log(val)}
      />
      <h2>What's next?</h2>
    </div>
  );
}
