import { ApolloError } from '@apollo/client';
import { SimpleStopType } from '../queries';
import { Link } from 'react-router-dom';

const StopsList = ({
  stops,
  error,
  loading,
}: {
  stops: SimpleStopType[] | undefined;
  error: ApolloError | undefined;
  loading: boolean | undefined;
}) => {
  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center' }}>ERROR...</div>;
  }

  return (
    <div>
      {stops &&
        stops.map((stop) => (
          <Link key={stop.gtfsId} to={stop.gtfsId}>
            <h4>{stop.name}</h4>
          </Link>
        ))}
    </div>
  );
};

export default StopsList;
