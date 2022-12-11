import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

function Searchresults({ }) {
  const { searchrequest } = useParams() as any;
  useEffect(() => {
    document.title = searchrequest;
  }, [searchrequest])
  return (
    <div>
      request {useParams().searchrequest}
    </div>
  );
}

export default Searchresults;