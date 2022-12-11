import { useParams } from 'react-router-dom';

function Videopage({ }) {
  return (
    <div>
      id video: {useParams().id}
    </div>
  );
}

export default Videopage;