import dayjs from 'dayjs';

export const onValidation = (formData, setFormError, msg = '', myPageCheck, isKakao = false) => {
  const errors = {};
  const todayString = dayjs().format('YYYY년 M월 D일');
  const today = dayjs();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,64}$/;
  const nicknameRegex = /^[A-Za-z0-9]+$/;
  const nameRegex = /^[가-힣]+$/;
  const birthRegex = /^\d{4}-\d{2}-\d{2}$/;

  const { email, password, confirmPassword, name, birth, nickname, bio } = formData;

  const formDataFields = {
    email: '이메일',
    password: '비밀번호',
    name: '이름',
    birth: '생년월일',
    nickname: '닉네임',
  };

  const fieldsCheck = isKakao
    ? Object.keys(formDataFields).filter((field) => field !== 'password')
    : Object.keys(formDataFields);

  //formDataFieldsr객체를 배열로 만듦 -> forEach로 순서대로 값을 가져옴
  fieldsCheck.forEach((field) => {
    if (!formData[field]?.trim()) {
      errors[field] = {
        message: `${formDataFields[field]}는 반드시 입력해야하는 필수 사항입니다.`,
      };
    }
  });

  //fomeData : 입력된 정보, myPageCheck : 기존에 입력되어 있던 정보
  if (myPageCheck) {
    const isSameEmail = formData.email === myPageCheck.email;
    const isSameNickname = formData.nickname === myPageCheck.nickname;

    if (isSameEmail && isSameNickname) {
      errors.email = { message: '이전과 동일한 이메일입니다.' };
      errors.nickname = { message: '이전과 동일한 닉네임입니다.' };
    } else if (isSameNickname) {
      errors.nickname = { message: '이전과 동일한 닉네임입니다.' };
    }
  }

  if (email && email.trim() && !emailRegex.test(email)) {
    errors.email = { message: '이메일 형식이 올바르지 않습니다.' };
  } else if (msg.includes('이메일')) {
    errors.email = { message: '이미 사용중인 이메일입니다.' };
  }

  if (!isKakao) {
    if (password && password.trim()) {
      if (password.length < 8 || password.length > 64) {
        errors.password = { message: '비밀번호는 최소 8자 이상, 최대 64자 이하여야 합니다.' };
      } else if (!passwordRegex.test(password)) {
        errors.password = { message: '비밀번호 8~64자, 영문, 숫자, 특수문자가 필수입니다.' };
      }
    }

    if (confirmPassword !== password) {
      errors.confirmPassword = { message: '비밀번호가 일치하지 않습니다.' };
    }
  }

  if (name && name.trim() && !nameRegex.test(name)) {
    errors.name = { message: '이름은 한글만 가능합니다.' };
  } else if (msg.includes('이름')) {
    errors.name = { message: '이미 사용중인 이름입니다.' };
  }

  if (birth && birth.trim()) {
    if (!birthRegex.test(birth)) {
      errors.birth = { message: '생년월일은 YYYY-MM-DD 형식으로 입력해주세요.' };
    } else if (dayjs(birth).isAfter(today)) {
      errors.birth = { message: `${todayString} 이전의 날짜만 입력 가능합니다.` };
    }
  }

  if (nickname && nickname.trim() && !nicknameRegex.test(nickname)) {
    errors.nickname = { message: '닉네임은 영문, 숫자만 가능합니다.' };
  } else if (msg.includes('닉네임')) {
    errors.nickname = { message: '이미 사용중인 닉네임입니다.' };
  }

  if (bio.length > 30) {
    errors.bio = { message: '소개는 최대 30자 이하여야 합니다.' };
  }

  setFormError(errors);
  return Object.keys(errors).length === 0; // 유효성 통과 여부 반환
};
