import { MintData } from '../hooks/useOwnMints';
import { SalesData } from '../hooks/useOwnSales';
import { TransferData } from '../hooks/useOwnTransfers';
import { Asset } from '../types/state';

export function calculateZorfolioValue(assets: Asset[]): number {
  return assets.reduce((accumulator, asset) => {
    return accumulator + (asset.current?.priceUsdc || 0);
  }, 0);
}

function sum(list: number[]): number {
  return list.reduce((accumulator, number) => {
    return accumulator + number;
  }, 0);
}

function saleToAssetMapper(data: SalesData, acquisition: boolean): Asset[] {
  return data.sales.nodes.map((node) => {
    let asset: Asset = {
      contractAddress: node.token.collectionAddress,
      tokenId: node.token.tokenId,
      collectionName: node.token.collectionName,
      name: node.token.name,
      mediaUrl: node.token.image.mediaEncoding?.thumbnail || node.token.tokenUrl
    };
    if (acquisition) {
      asset.acquisition = {
        type: 'BUY',
        blockNumber:
          node.sale.transactionInfo.blockNumber || node.sale.price.blockNumber,
        priceUsdc: node.sale.price.usdcPrice.decimal
      };
    } else {
      asset.release = {
        type: 'SALE',
        blockNumber:
          node.sale.transactionInfo.blockNumber || node.sale.price.blockNumber,
        priceUsdc: node.sale.price.usdcPrice.decimal
      };
    }
    return asset;
  });
}

function transferToAssetMapper(
  data: TransferData,
  acquisition: boolean
): Asset[] {
  return data.events.nodes.map((node) => {
    console.log('parsing asset for node', node);
    let asset: Asset = {
      contractAddress: node.collectionAddress,
      tokenId: node.tokenId
    };
    if (acquisition) {
      asset.acquisition = {
        type: node.eventType,
        blockNumber: node.transactionInfo.blockNumber,
        priceUsdc: 0 // A gift's a gift 😉
      };
    } else {
      asset.release = {
        type: node.eventType,
        blockNumber: node.transactionInfo.blockNumber,
        priceUsdc: 0 // A gift's a gift 😉
      };
    }
    return asset;
  });
}

function mintToAssetMapper(data: MintData): Asset[] {
  return data.mints.nodes.map((node) => {
    return {
      contractAddress: node.token.collectionAddress,
      tokenId: node.token.tokenId,
      collectionName: node.token.collectionName,
      name: node.token.name,
      mediaUrl:
        node.token.image?.mediaEncoding.thumbnail || node.token.tokenUrl,
      acquisition: {
        type: 'MINT',
        blockNumber: node.mint.price.blockNumber,
        priceUsdc: node.mint.price.usdcPrice.decimal
      }
    };
  });
}

function chooseOldestAsset(assetLists: Asset[][], indexes: number[]): number {
  let min = Infinity;
  let minIndex = -1;
  for (let i = 0; i < indexes.length; i++) {
    const index = indexes[i];
    const assets = assetLists[i];
    const blockNumber = assets[index]?.acquisition?.blockNumber || Infinity;
    if (blockNumber < min) {
      min = blockNumber;
      minIndex = i;
    }
  }
  return Math.max(minIndex, 0);
}

export function getAssetMapKey(address: string, tokenId: number): string {
  return tokenId.toString() + '-' + address;
}

export function parseAssetBoundaries(
  salesData: SalesData,
  transferData: TransferData,
  receiptData: TransferData,
  buyData: SalesData,
  mintData: MintData
): Asset[] {
  // All data is returned ordered by time ASC (oldest to newest)

  let assets: Asset[] = [];

  let assetMap: Map<string, number> = new Map<string, number>(); // map tokenId-contractAddress -> index in asset list

  let indexes = [0, 0, 0];
  const assetlists = [
    transferToAssetMapper(receiptData, true),
    saleToAssetMapper(buyData, true),
    mintToAssetMapper(mintData)
  ];

  const totalItems = sum(assetlists.map((assets) => assets.length));

  // get nft left bounds (via a jank merge sort since they're already sorted)
  while (sum(indexes) < totalItems - indexes.length) {
    // find the oldest asset
    const choiceIndex = chooseOldestAsset(assetlists, indexes);
    const choice = assetlists[choiceIndex][indexes[choiceIndex]];
    if (!choice) {
      console.log('THERE IS NO CHOICE', indexes, totalItems);
    }
    assets.push(choice); // add the oldest asset to the list
    assetMap.set(
      getAssetMapKey(choice.contractAddress, choice.tokenId),
      assets.length - 1
    );
    indexes[choiceIndex] += 1;
  }

  // add the right bounds to the sorted assets
  const rightBounds = [
    transferToAssetMapper(transferData, false),
    saleToAssetMapper(salesData, false)
  ];
  rightBounds.forEach((bounds) => {
    bounds.forEach((asset) => {
      const index = assetMap.get(
        getAssetMapKey(asset.contractAddress, asset.tokenId)
      );
      if (!index) {
        return;
      }
      const updateAsset = assets[index];
      updateAsset.release = asset.release;
    });
  });
  return assets;
}
