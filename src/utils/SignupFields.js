import { InputFields } from '@/constant/inputFields';

export const createInputFields = (
  formData,
  setFormData,
  formError = {},
  isKakao = false,
  isUserInfo = false,
) => {
  const inputfields = InputFields(isKakao);

  const mypageFields = isUserInfo
    ? inputfields.filter((field) => field.name !== 'nickname' && field.name !== 'bio')
    : inputfields;

  return mypageFields.map((field) => ({
    ...field,
    value: formData[field.name],
    onChange: (e) => setFormData((prev) => ({ ...prev, [field.name]: e.target.value })),
    error: formError[field.name],
  }));
};
