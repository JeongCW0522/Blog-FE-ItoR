import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, SignUp, SignUpEmail, SignUpKakao, Mypage } from '@/pages';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/signUpEmail' element={<SignUpEmail />} />
        <Route path='/signUpKakao' element={<SignUpKakao />} />
        <Route path='/mypage' element={<Mypage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
