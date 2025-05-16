export const storeTokens = (accessToken, refreshToken, nickname, introduction, profilePicture) => {
  if (accessToken && refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }
  if (nickname && introduction && profilePicture !== undefined) {
    localStorage.setItem('nickname', nickname);
    localStorage.setItem('introduction', introduction);
    localStorage.setItem('profilePicture', profilePicture);
  }
};
