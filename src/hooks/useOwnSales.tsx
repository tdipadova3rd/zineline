import { gql, useQuery } from '@apollo/client';

export interface SalesData {
  sales: {
    nodes: {
      sale: {
        saleType: string;
        transactionInfo: {
          blockNumber: number;
        };
        price: {
          blockNumber: number;
          usdcPrice: {
            decimal: number;
          };
        };
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

const OWN_SALE_QUERY = gql`
  query OwnSales($sellerAddress: String!) {
    sales(
      where: { sellerAddresses: [$sellerAddress] }
      sort: { sortKey: TIME, sortDirection: ASC }
      pagination: { limit: 500 }
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
