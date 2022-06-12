import { useParams } from 'react-router-dom';
import { useStopQuery } from '../queries';

const StopInformation = () => {
  const params = useParams();
  const { loading, error, data } = useStopQuery(params.stopId);

  if (loading) {
    return <div style={{ textAlign: 'center' }}>Loading...</div>;
  }

  if (error) {
    return <div style={{ textAlign: 'center' }}>ERROR...</div>;
  }

  return (
    <div>
      <h3>{params.stopId}</h3>
    </div>
  );
};

export default StopInformation;
