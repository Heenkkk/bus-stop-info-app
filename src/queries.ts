import { gql, useLazyQuery } from '@apollo/client';

export interface StopType {
  id: string;
  gtfsId: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  zoneId: string;
  desc: string;
  url: string;
}

export interface StopsQueryResponse {
  stops: StopType[];
}

export const GET_STOPS = gql`
  query stops($stopName: String!) {
    stops(name: $stopName) {
      id
      gtfsId
      name
      code
      lat
      lon
      zoneId
      desc
      url
    }
  }
`;

export const useStopsQuery = () => {
  return useLazyQuery<StopsQueryResponse>(GET_STOPS);
};
