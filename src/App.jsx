import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home, SignUp, SignUpEmail, SignUpKakao, Mypage, BlogDetail } from '@/pages';
import { LoginProvider } from './context/LoginContext';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signUpEmail' element={<SignUpEmail />} />
          <Route path='/signUpKakao' element={<SignUpKakao />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/detail/:id' element={<BlogDetail />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
