import { render, fireEvent, waitFor, cleanup } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import { MockedProvider } from '@apollo/client/testing';
import { SimpleStopType, GET_STOPS, StopType, GET_STOP_BY_ID } from './queries';
import { act } from 'react-dom/test-utils';
import StopInformation from './components/StopInformation';
import { Route, Router, Routes } from 'react-router-dom';
import { createMemoryHistory } from 'history';

afterEach(cleanup);

describe('<App />', () => {
  it('should render application title', () => {
    const appComponent = render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );
    expect(appComponent.queryByTestId('application-title')).toHaveTextContent(
      'Bus Stop Information App',
    );
  });
  it('should render text field', () => {
    const appComponent = render(
      <MockedProvider>
        <App />
      </MockedProvider>,
    );

    expect(appComponent.queryByTestId(/search-stops/i)).not.toEqual(null);
  });
});

describe('Application', () => {
  it('should find data', async () => {
    const stops: SimpleStopType[] = [
      {
        gtfsId: 'HSL:2222225',
        name: 'Innopoli',
        code: 'E2220',
        zoneId: 'B',
        desc: 'Tekniikantie',
        vehicleMode: 'BUS',
      },
    ];
    const mocks = [
      {
        request: {
          query: GET_STOPS,
          variables: {
            stopName: 'Innopoli',
          },
        },
        result: {
          data: {
            stops: stops,
          },
        },
      },
    ];
    const appComponent = await waitFor(() =>
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <App />
        </MockedProvider>,
      ),
    );
    const textField = await waitFor(() =>
      appComponent.getByTestId(/search-stops/i).querySelector('input'),
    );

    if (!textField) throw new Error('No text field found');

    act(() => {
      fireEvent.change(textField, { target: { value: 'Innopoli' } });
    });

    expect(
      await waitFor(() => appComponent.getByText(/Tekniikantie/i)),
    ).toBeInTheDocument();
  });
});

describe('Stop information', () => {
  it('should contain data', async () => {
    const stop: StopType = {
      gtfsId: 'HSL:2222225',
      name: 'Innopoli',
      code: 'E2220',
      lat: 60.185777,
      lon: 24.81338,
      zoneId: 'B',
      desc: 'Tekniikantie',
      wheelchairBoarding: 'NO_INFORMATION',
      parentStation: null,
      alerts: [],
      routes: [
        {
          gtfsId: 'HSL:4555',
          shortName: '555',
          longName: 'Keilaniemi (M)-Martinlaakso',
          mode: 'BUS',
        },
        {
          gtfsId: 'HSL:2111',
          shortName: '111',
          longName: 'Otaniemi-Tapiola(M)-Westend-Matinkylä(M)-Hyljelahti',
          mode: 'BUS',
        },
        {
          gtfsId: 'HSL:2550',
          shortName: '550',
          longName: 'Itäkeskus-Westendinasema',
          mode: 'BUS',
        },
      ],
      stoptimesWithoutPatterns: [
        {
          scheduledDeparture: 69360,
          serviceDay: 1655154000,
          headsign: 'Itäkeskus(M) via Leppävaara as.',
          trip: {
            id: 'VHJpcDpIU0w6MjU1MF8yMDIyMDYxMF9UaV8yXzE5MDU=',
            route: {
              shortName: '550',
              longName: 'Itäkeskus-Westendinasema',
            },
          },
        },
        {
          scheduledDeparture: 69600,
          serviceDay: 1655154000,
          headsign: 'Hyljelahti via Tapiola(M)',
          trip: {
            id: 'VHJpcDpIU0w6MjExMV8yMDIyMDYxMF9UaV8xXzE5MTU=',
            route: {
              shortName: '111',
              longName: 'Otaniemi-Tapiola(M)-Westend-Matinkylä(M)-Hyljelahti',
            },
          },
        },
      ],
    };

    const mocks = [
      {
        request: {
          query: GET_STOP_BY_ID,
          variables: {
            stopId: 'HSL:2222225',
          },
        },
        result: {
          data: {
            stop: stop,
          },
        },
      },
    ];
    const history = createMemoryHistory();
    history.push('/HSL:2222225');
    const appComponent = await waitFor(() =>
      render(
        <MockedProvider mocks={mocks} addTypename={false}>
          <Router location={history.location} navigator={history}>
            <Routes>
              <Route path={'/:stopId'} element={<StopInformation />} />
            </Routes>
          </Router>
        </MockedProvider>,
      ),
    );
    expect(
      await waitFor(() =>
        appComponent.getByText('555: Keilaniemi (M)-Martinlaakso'),
      ),
    ).toBeInTheDocument();
  });
});
