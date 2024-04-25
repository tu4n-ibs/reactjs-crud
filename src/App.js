import { Route, Routes } from 'react-router-dom';
import Home from './Home';
import Create from './Create';
import Update from './Update';

function App() {
  return (
    <>
        <Routes>
          <Route path='/' element={<Home/>}></Route>
          <Route path='/create' element={<Create/>}></Route>
          <Route path='/update/:id' element={<Update/>}></Route>
        </Routes>
    
    </>
  );
}

export default App;
