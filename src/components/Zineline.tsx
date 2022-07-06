import { Range, Handle } from 'rc-slider';
import { Box, Stack, Text, Stat, Tag } from 'degen';
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
    width: '100px',
    height: '100px',
    top: '-20px',
    backgroundColor: 'transparent',
    textAlign: 'center',
    border: 'transparent'
  },
  {
    width: '100px',
    height: '100px',
    top: '-20px',
    backgroundColor: 'transparent',
    textAlign: 'center',
    border: 'transparent'
  }
];

const railStyle: React.CSSProperties = {
  backgroundColor: '#ffcccb',
  height: '10px',
};

const trackStyle: React.CSSProperties = {
  backgroundColor: '#CBC3E3',
  height: '10px',
};

const sliderStyle: React.CSSProperties = {
  backgroundColor: 'transparent',
}

export default function Zineline(props: IProps) {
  // const [purchaseDate, setPurchaseDate] = useState(0);
  // const [hodlDate, setHodlDate] = useState(0);

  const bounds = [
    props.asset.acquisition?.blockNumber || props.min,
    props.asset.release?.blockNumber || props.max
  ];

  let tokenIdStr = props.asset.tokenId.toString();
  tokenIdStr =
    tokenIdStr.length <= 8 ? tokenIdStr : tokenIdStr.substring(0, 5) + '...';

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
      <Stack direction="horizontal" justify="space-between" align="center" flex={'auto'} wrap={true}>
        <Stack direction="vertical">
          <Box marginX={'10'}>
            <Stat value={bounds[0]} label="Acquired At" meta="Block Number" />
          </Box>
          <Box marginX={'10'}>
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
          <Box marginX={'10'}>
            <Tag>Token {tokenIdStr}</Tag>
          </Box>
        </Stack>
        <Box marginX={'10'}>
          <div>
            <Text wordBreak="break-word">
              Collection Name: {props.asset.collectionName}
            </Text>
            <Text wordBreak="break-word">
              Collection Address: {props.asset.contractAddress}
            </Text>
          </div>
          <br />
          <div>
            <Text wordBreak="break-word">Token Name: {props.asset.name}</Text>
          </div>
        </Box>
        <Box marginX={'10'}>
          <Stat value={bounds[1]} label="Held Until" meta="Block Number" />
        </Box>
      </Stack>

      <Box marginX={'10'}>
        <br />
        <Range
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
          style={sliderStyle}
        />
      </Box>
      <br />
    </Stack>
  );
}
