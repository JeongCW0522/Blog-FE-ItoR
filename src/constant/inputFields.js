export const InputFields = (isKakao = false) => [
  {
    label: '이메일',
    name: 'email',
    type: 'email',
    placeholder: '이메일',
  },
  ...(!isKakao
    ? [
        {
          label: '비밀번호',
          name: 'password',
          type: 'password',
          placeholder: '.....',
        },
        {
          label: '비밀번호 확인',
          name: 'confirmPassword',
          type: 'password',
          placeholder: '.....',
        },
      ]
    : []),
  {
    label: '이름',
    name: 'name',
    type: 'text',
    placeholder: '이름',
  },
  {
    label: '생년월일',
    name: 'birth',
    type: 'text',
    placeholder: 'YYYY-MM-DD',
  },
  {
    label: '닉네임',
    name: 'nickname',
    type: 'text',
    placeholder: '닉네임',
  },
  {
    label: '한 줄 소개',
    name: 'bio',
    type: 'text',
    placeholder: '한 줄 소개',
  },
];
