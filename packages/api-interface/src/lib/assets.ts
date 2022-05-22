export interface INftToken {
  // Collection ID, Series ID, SerialNumber
  path: [number, number, number];
  owner: string;
}

export interface INftCollectionSummary {
  collectionId: number;
  name: string;
  owner: string;
  tokens: INftToken[];
}

// Requests

export interface INftCollectionSummaryRequest {
  id: string;
}
