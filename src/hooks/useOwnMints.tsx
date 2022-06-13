import { gql, useQuery } from '@apollo/client';

export interface MintData {
  mints: {
    nodes: {
      mint: {
        price: {
          usdcPrice: {
            decimal: number;
          };
          blockNumber: number;
        };
        originatorAddress: string;
        toAddress: string;
      };
      token: {
        collectionAddress: string;
        collectionName: string;
        name: string;
        tokenId: number;
        tokenUrl: string;
        image: {
          mediaEncoding: {
            thumbnail: string;
          };
        };
      };
    }[];
  };
}

const OWN_MINTS_QUERY = gql`
  query OwnMints($minterAddress: String!) {
    mints(
      where: { minterAddresses: [$minterAddress] }
      sort: { sortKey: TIME, sortDirection: ASC }
      pagination: { limit: 500 }
    ) {
      nodes {
        mint {
          price {
            usdcPrice {
              decimal
            }
            blockNumber
          }
          originatorAddress
          toAddress
        }
        token {
          collectionAddress
          collectionName
          name
          tokenId
          tokenUrl
          image {
            mediaEncoding {
              ... on ImageEncodingTypes {
                thumbnail
              }
            }
          }
        }
      }
    }
  }
`;

export const useOwnMints = (minterAddress: string) => {
  const { loading, error, data } = useQuery(OWN_MINTS_QUERY, {
    variables: { minterAddress }
  });

  return { loading, error, data };
};
