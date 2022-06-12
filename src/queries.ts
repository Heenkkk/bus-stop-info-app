import { gql, useLazyQuery, useQuery } from '@apollo/client';

export interface StopType {
  gtfsId: string;
  name: string;
  code: string;
  lat: number;
  lon: number;
  zoneId: string;
  desc: string;
  url: string;
  wheelchairBoarding: 'POSSIBLE' | 'NO_INFORMATION' | 'NOT_POSSIBLE';
  parentStation:
    | {
        gtfsId: string;
        name: string;
      }
    | undefined;
  alerts: {
    alertDescriptionText: string;
    alertUrl: string;
  }[];
  routes: {
    gtfsId: string;
    shortName: string;
    longName: string;
    mode: string;
  }[];
  stoptimesWithoutPatterns: {
    scheduledDeparture: number;
    serviceDay: number;
    headsign: string;
    trip: {
      id: string;
      route: {
        shortName: string;
        longName: string;
      };
    };
  }[];
}

export interface StopQueryResponseType {
  stop: StopType;
}

export interface SimpleStopType {
  gtfsId: string;
  name: string;
  code: string;
  zoneId: string;
  desc: string;
}

export interface StopsListQueryResponseType {
  stops: SimpleStopType[];
}

export const GET_STOPS = gql`
  query stops($stopName: String!) {
    stops(name: $stopName) {
      gtfsId
      name
      code
      zoneId
      desc
    }
  }
`;

export const GET_STOP_BY_ID = gql`
  query stop($stopId: String!) {
    stop(id: $stopId) {
      gtfsId
      name
      code
      lat
      lon
      zoneId
      desc
      url
      wheelchairBoarding
      parentStation {
        gtfsId
        name
      }
      alerts {
        alertDescriptionText
        alertUrl
      }
      routes {
        gtfsId
        shortName
        longName
        mode
      }
      stoptimesWithoutPatterns {
        scheduledDeparture
        serviceDay
        headsign
        trip {
          id
          route {
            shortName
            longName
          }
        }
      }
    }
  }
`;

export const useStopsListQuery = () => {
  return useLazyQuery<StopsListQueryResponseType>(GET_STOPS);
};

export const useStopQuery = (stopId: string | undefined) => {
  return useQuery<StopQueryResponseType>(GET_STOP_BY_ID, {
    variables: { stopId: stopId },
  });
};
