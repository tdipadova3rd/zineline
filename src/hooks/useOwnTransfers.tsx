import { gql, useQuery } from '@apollo/client';

export interface TransferData {
  events: {
    nodes: {
      eventType: string;
      transactionInfo: {
        blockNumber: number;
      };
      tokenId: number;
      collectionAddress: string;
    }[];
  };
}

const OWN_TRANSFERS_QUERY = gql`
  query OwnTransfers($senderAddress: String!) {
    events(
      filter: { senderAddresses: [$senderAddress], eventTypes: TRANSFER_EVENT }
      sort: { sortKey: CREATED, sortDirection: ASC }
      pagination: { limit: 500 }
    ) {
      nodes {
        eventType
        transactionInfo {
          blockNumber
        }
        tokenId
        collectionAddress
      }
    }
  }
`;

export const useOwnTransfers = (senderAddress: string) => {
  const { loading, error, data } = useQuery(OWN_TRANSFERS_QUERY, {
    variables: { senderAddress }
  });

  return { loading, error, data };
};
