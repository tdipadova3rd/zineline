import { Range, Handle } from 'rc-slider';
import Zandle from './Zandle';
import { Asset } from '../types/state';

export interface IProps {
  asset: Asset;
  min: number;
  max: number;
  // onSliderChange: (value: number[]) => void;
}

const handleStyles: React.CSSProperties[] = [
  {
    position: 'relative',
    // transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    top: '-25px',
    left: '-25px',
    backgroundColor: 'transparent',
    border: 'transparent'
  },
  {
    position: 'relative',
    // transform: 'translate(-50%, -50%)',
    width: '100px',
    height: '100px',
    top: '-125px',
    left: '-25px',
    backgroundColor: 'transparent',
    border: 'transparent'
  }
];

const railStyle: React.CSSProperties = {
  backgroundColor: '#ffcccb',
  height: '20px',
  top: '-5px'
};

const trackStyle: React.CSSProperties = {
  backgroundColor: '#CBC3E3',
  height: '20px',
  top: '-5px'
};

export default function Zineline(props: IProps) {
  // const [purchaseDate, setPurchaseDate] = useState(0);
  // const [hodlDate, setHodlDate] = useState(0);

  const bounds = [
    props.asset.acquisition?.blockNumber || props.min,
    props.asset.release?.blockNumber || props.max
  ];

  // useEffect(() => {
  //   getBlock(bounds[0]).then((val) => {
  //     setPurchaseDate(val.timestamp);
  //   });
  //   getBlock(bounds[1]).then((val) => {
  //     setHodlDate(val.timestamp);
  //   });
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const imageUri = props.asset.mediaUrl || '../zorb.svg';
  return (
    <div className="flex-row">
      <div className="place-content-between grid-cols-2 gap-4">
        <div className="rounded-lg border-white">
          <label>Purchased at Block Number {bounds[0]}</label>
          <br />
          <label>Held Until Block Number {bounds[1]}</label>
        </div>
        <div className="rounded-lg border-white">
          <label>Collection Name: {props.asset.collectionName}</label>
          <br />
          <label>Collection Address: {props.asset.contractAddress}</label>
        </div>
        <div className="rounded-lg border-white">
          <label>Token Name: {props.asset.name}</label>
          <br />
          <label>Token ID: {props.asset.tokenId}</label>
        </div>
        <div className="rounded-lg border-white object-center">
          <img src={imageUri} width={100} height={100} alt={props.asset.name} />
        </div>
      </div>
      <div className="relative">
        <br />
        <Range
          className="center"
          defaultValue={bounds}
          allowCross={false}
          min={props.min}
          max={props.max}
          disabled={true}
          // onChange={props.onSliderChange}
          handle={(handleProps) => {
            return (
              <Handle {...handleProps}>
                <Zandle {...handleProps} />
              </Handle>
            );
          }}
          handleStyle={handleStyles}
          trackStyle={[trackStyle]}
          railStyle={railStyle}
        />
      </div>
      <br />
    </div>
  );
}
