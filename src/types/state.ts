// state actually is a list of all mints, sales, burns, and transfers, (represented by lower/upper bound)
//       keyed by nft address and id - the key is actually an index, ordered by acquistion date
//       with a price for the nft at the blocknumber selected in ZimeWarp

export interface Asset {
  contractAddress: string;
  tokenId: number;
  collectionName: string;
  name: string;
  mediaUrl: string;
  acquisition: TemporalPrice; // can be a mint or purchase or receive
  release: TemporalPrice; // can be a burn or sale or send
  current: TemporalPrice; // the price at the warp or current blocknumber
}

export interface TemporalPrice {
  blocknumber: number;
  priceUsdc: number;
}
