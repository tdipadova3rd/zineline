import { gql, useQuery } from '@apollo/client';

const OWN_MINTS_QUERY = gql`
  query OwnMints($minterAddress: String!) {
    mints(
      where: { minterAddresses: [$minterAddress] }
      sort: { sortKey: TIME, sortDirection: DESC }
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
