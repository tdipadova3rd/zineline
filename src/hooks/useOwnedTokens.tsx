import { gql, useQuery } from '@apollo/client';

export const OWNED_TOKENS_QUERY = gql`
  query Tokens($ownerAddress: String!) {
    tokens(
      where: { ownerAddresses: [$ownerAddress] }
      pagination: { limit: 500 }
      sort: { sortKey: TRANSFERRED, sortDirection: ASC }
    ) {
      nodes {
        token {
          collectionAddress
          collectionName
          tokenId
          name
          mintInfo {
            originatorAddress
            price {
              blockNumber
              usdcPrice {
                decimal
              }
            }
            toAddress
            mintContext {
              blockNumber
            }
          }
        }
      }
    }
  }
`;

export const useOwnTokens = (ownerAddress: string) => {
  const { loading, error, data } = useQuery(OWNED_TOKENS_QUERY, {
    variables: { ownerAddress }
  });

  return { loading, error, data };
};
