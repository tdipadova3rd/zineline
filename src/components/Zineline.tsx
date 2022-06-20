import { Range, Handle } from 'rc-slider';
import { Box, Stack, Text, Stat } from 'degen';
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
    top: '-120px',
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
    <Stack direction="vertical">
      <Stack direction="horizontal" justify="stretch">
        <Stack direction="vertical">
          <Stat value={bounds[0]} label="Acquired At" meta="Block Number" />
          <Box>
            <img
              src={imageUri}
              width={100}
              height={100}
              alt={props.asset.name}
              onError={(e) => {
                e.currentTarget.src = '../zorb.svg';
              }}
            />
          </Box>
        </Stack>
        <Box>
          <div>
            <Text>Collection Name: {props.asset.collectionName}</Text>
            <br />
            <Text>Collection Address: {props.asset.contractAddress}</Text>
          </div>
          <div>
            <Text>Token Name: {props.asset.name}</Text>
            <br />
            <Text>Token ID: {props.asset.tokenId}</Text>
          </div>
        </Box>
        <Stat value={bounds[1]} label="Held Until" meta="Block Number" />
      </Stack>

      <Box>
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
      </Box>
      <br />
    </Stack>
  );
}
