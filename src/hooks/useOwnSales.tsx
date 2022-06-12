import { gql, useQuery } from '@apollo/client';
const OWN_SALE_QUERY = gql`
  query OwnSales($sellerAddress: String!) {
    sales(
      where: { sellerAddresses: [$sellerAddress] }
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

export const useOwnSales = (sellerAddress: string) => {
  const { loading, error, data } = useQuery(OWN_SALE_QUERY, {
    variables: { sellerAddress }
  });

  return { loading, error, data };
};
