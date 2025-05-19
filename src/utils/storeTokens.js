export const storeTokens = (accessToken, refreshToken) => {
  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
};

export const storeInfo = (nickname, introduction, profilePicture) => {
  if (nickname && introduction && profilePicture !== undefined) {
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('introduction', introduction);
    localStorage.setItem('profilePicture', profilePicture);
  }
};
