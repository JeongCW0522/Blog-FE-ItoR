import { createContext, useContext, useState, useEffect } from 'react';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [isLogin, setIsLogin] = useState(false);

  //새로고침 후에도 로그인 유지
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setIsLogin(true);
    }
  }, []);

  const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('userInfo');
    setIsLogin(false);
  };

  return (
    <LoginContext.Provider value={{ isLogin, setIsLogin, logout }}>
      {children}
    </LoginContext.Provider>
  );
};

//커스텀 Hook useLogin 만듦
export const useLogin = () => useContext(LoginContext);
