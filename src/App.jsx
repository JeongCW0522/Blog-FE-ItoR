import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Home,
  SignUp,
  SignUpEmail,
  SignUpKakao,
  Mypage,
  BlogDetail,
  BlogWrite,
  BlogEdit,
  MyBlog,
} from '@/pages';
import { LoginProvider } from './context/LoginContext';

function App() {
  return (
    <LoginProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signUp' element={<SignUp />} />
          <Route path='/signUp/Email' element={<SignUpEmail />} />
          <Route path='/signUp/Kakao' element={<SignUpKakao />} />
          <Route path='/mypage' element={<Mypage />} />
          <Route path='/detail/:id' element={<BlogDetail />} />
          <Route path='/write' element={<BlogWrite />} />
          <Route path='/edit' element={<BlogEdit />} />
          <Route path='/myblog' element={<MyBlog />} />
        </Routes>
      </BrowserRouter>
    </LoginProvider>
  );
}

export default App;
