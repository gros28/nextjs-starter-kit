export type LoginValidationErrors = {
  email: string
  password: string
}

export function validateLoginForm(email: string, password: string) {
  const errors: LoginValidationErrors = { email: '', password: '' }

  if (!email.trim()) {
    errors.email = '이메일을 입력해 주세요.'
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = '올바른 이메일 주소를 입력해 주세요.'
  }

  if (!password.trim()) {
    errors.password = '비밀번호를 입력해 주세요.'
  } else if (password.length < 8) {
    errors.password = '비밀번호는 최소 8자 이상이어야 합니다.'
  }

  return errors
}
