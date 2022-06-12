import { gql } from '@apollo/client';

export const OWNED_TOKENS_QUERY = gql`
  query Tokens {
    tokens(
      where: { ownerAddresses: "steev.eth" }
      pagination: { limit: 100 }
      sort: { sortKey: TRANSFERRED, sortDirection: DESC }
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
      pageInfo {
        limit
        hasNextPage
      }
    }
  }
`;
