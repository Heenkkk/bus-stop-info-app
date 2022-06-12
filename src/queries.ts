import { gql, useLazyQuery, useQuery } from '@apollo/client';

/**
 * The complete interface for a single stop query. Contains
 * all the relevant information for visualizing the query.
 */
export interface StopType {
  /** The id of a stop. Used for data identification. */
  gtfsId: string;
  /** The name of a stop. This is what we query for. */
  name: string;
  /** The short code of a stop. */
  code: string;
  /** Latitude. */
  lat: number;
  /** Longitude. */
  lon: number;
  /** The zone of the stop. */
  zoneId: string;
  /** Short description. Usually the street address of the stop. */
  desc: string;
  /** Accessibility of the stop. */
  wheelchairBoarding: 'POSSIBLE' | 'NO_INFORMATION' | 'NOT_POSSIBLE';
  /** The parent station, if available (stop is part of a station). */
  parentStation:
    | {
        /** Id of the station. */
        gtfsId: string;
        /** Name of the station. */
        name: string;
      }
    | undefined;
  /**
   * Alerts that could affect this stop. Empty if there are no relevant
   * alerts.
   */
  alerts: {
    /** Short description of the alert. */
    alertDescriptionText: string;
    /** URL of the original alert. You can find more information here. */
    alertUrl: string;
  }[];
  /** The routes that go through this stop. */
  routes: {
    /** Id of the route. */
    gtfsId: string;
    /** Short name of the route. For buses, the number of the bus. */
    shortName: string;
    /** Longer name of the route. Contains more information. */
    longName: string;
    /** The mode of the route, for instance, BUS or SUBWAY. */
    mode: string;
  }[];
  /** Schedule of routes going through the stop. */
  stoptimesWithoutPatterns: {
    /** The scheduled departure time as seconds from midnight. */
    scheduledDeparture: number;
    /** The service day as a unix time stamp (seconds). */
    serviceDay: number;
    /** The headsign on the route vehicle. */
    headsign: string;
    /** The trip of the route. */
    trip: {
      /** Id for the trip. */
      id: string;
      /** The route itself. */
      route: {
        /** Śhort name. */
        shortName: string;
        /** Long name. */
        longName: string;
      };
    };
  }[];
}

/**
 * The query response type.
 */
export interface StopQueryResponseType {
  /** A single query returns one stop. */
  stop: StopType;
}

/**
 * A simplified version of {@link StopType}. Required for fetching
 * several stops for the stops listing.
 */
export interface SimpleStopType {
  /** Id of the stop. */
  gtfsId: string;
  /** Name of the stop (this is what we are querying for). */
  name: string;
  /** The code of the stop. */
  code: string;
  /** The zone in which the stop exists. */
  zoneId: string;
  /** Short description of the stop. Usually the street address. */
  desc: string;
}

/**
 * The query response type.
 */
export interface StopsListQueryResponseType {
  /** A simple query returns a list of stops. */
  stops: SimpleStopType[];
}

/**
 * The graphql query for querying several stops using the name
 * as argument. Returns several stops (if available), matching
 * the name.
 */
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

/**
 * Fetches a single stop using the id of the stop. Should always return
 * something, as the id is fetched from {@link GET_STOPS}.
 */
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

/**
 * Query hook for {@link GET_STOPS}.
 * @returns A lazy query containing the request.
 */
export const useStopsListQuery = () => {
  return useLazyQuery<StopsListQueryResponseType>(GET_STOPS);
};

/**
 * Query hook for {@link GET_STOP_BY_ID}.
 * @param stopId The stop id that we fetch from the URI. Can also be
 * undefined.
 * @returns The query results.
 */
export const useStopQuery = (stopId: string | undefined) => {
  return useQuery<StopQueryResponseType>(GET_STOP_BY_ID, {
    variables: { stopId: stopId },
  });
};
