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
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import KakaoRedirectPage from './pages/KakaoRedirectPage';

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
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
            <Route path='/detail/:id/edit' element={<BlogEdit />} />
            <Route path='/myblog' element={<MyBlog />} />
            <Route path='/oauth/kakao/success' element={<KakaoRedirectPage />} />
          </Routes>
        </BrowserRouter>
      </LoginProvider>
    </QueryClientProvider>
  );
}

export default App;
