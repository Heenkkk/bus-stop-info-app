import { ApolloError } from '@apollo/client';
import { StopType } from '../queries';

const StopsList = ({
  stops,
  error,
  loading,
}: {
  stops: StopType[] | undefined;
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
      {stops && stops.map((stop) => <h4 key={stop.id}>{stop.name}</h4>)}
    </div>
  );
};

export default StopsList;
