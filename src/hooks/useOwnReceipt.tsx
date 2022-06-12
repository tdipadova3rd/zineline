import { gql, useQuery } from '@apollo/client';
const OWN_RECEIPTS_QUERY = gql`
  query OwnReceipts($recipientAddress: String!) {
    events(
      filter: {
        recipientAddresses: [$recipientAddress]
        eventTypes: TRANSFER_EVENT
      }
      sort: { sortKey: CREATED, sortDirection: DESC }
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

export const useOwnReceipts = (recipientAddress: string) => {
  const { loading, error, data } = useQuery(OWN_RECEIPTS_QUERY, {
    variables: { recipientAddress }
  });

  return { loading, error, data };
};
