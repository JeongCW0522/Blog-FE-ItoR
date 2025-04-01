import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from '@/pages/Home';
import SignUp from '@/components/Signup';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
