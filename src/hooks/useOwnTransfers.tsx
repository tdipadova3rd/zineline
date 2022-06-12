import { gql, useQuery } from '@apollo/client';
const OWN_TRANSFERS_QUERY = gql`
  query OwnTransfers($senderAddress: String!) {
    events(
      filter: { senderAddresses: $senderAddress, eventTypes: TRANSFER_EVENT }
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

export const useOwnTransfers = (senderAddress: string) => {
  const { loading, error, data } = useQuery(OWN_TRANSFERS_QUERY, {
    variables: { senderAddress }
  });

  return { loading, error, data };
};
