import { gql, useQuery } from '@apollo/client';
const OWN_BUY_QUERY = gql`
  query OwnBuys($buyerAddress: String!) {
    sales(
      where: { buyerAddresses: $buyerAddress }
      sort: { sortKey: TIME, sortDirection: DESC }
    ) {
      nodes {
        sale {
          saleType
          transactionInfo {
            blockNumber
          }
          price {
            blockNumber
            usdcPrice {
              decimal
            }
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
  }
`;

export const useOwnBuys = (buyerAddress: string) => {
  const { loading, error, data } = useQuery(OWN_BUY_QUERY, {
    variables: { buyerAddress }
  });

  return { loading, error, data };
};
