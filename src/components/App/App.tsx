import youtube from '../../api/youtube-search';
import Layout from '../Layout/Layout';
import Homepage from '../../pages/Homepage/Homepage';
import Videopage from '../../pages/Videopage/Videopage';
import Notfoundpage from '../../pages/Notfoundpage/Notfoundpage';
import Searchresults from '../../pages/Searchresults/Searchresults';
import { Routes, Route } from 'react-router-dom'


function App({ }) {
  // const [value, setValue] = useState('');
  // const searchList = (e: string) => {
  //   youtube.get('/search', {
  //     params: {
  //       q: e
  //     }
  //   })
  //   .then(e => console.log(e))
  // }

  return (

    <Routes>
      <Route path='/' element={<Layout />}>
        <Route path='/' element={<Homepage />} />
        <Route path='/watch/:id' element={<Videopage />} />
        <Route path='/search/:searchrequest' element={< Searchresults />} />
        <Route path='*' element={<Notfoundpage />} />
      </Route>
    </Routes>
  );
}

export default App;