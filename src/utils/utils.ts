import { Asset } from '../types/state';

export function calculateZorfolioValue(assets: Asset[]) {
  return assets.reduce((accumulator, asset) => {
    return accumulator + asset.current.blocknumber;
  }, 0);
}
