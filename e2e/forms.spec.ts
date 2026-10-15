import { expect, test } from '@playwright/test'

test('login validates native-valid email and exposes the password toggle to keyboard users', async ({
  page,
}) => {
  const consoleOutput: string[] = []
  page.on('console', message => consoleOutput.push(message.text()))

  await page.goto('/login')
  const email = page.getByLabel('이메일')
  const password = page.locator('#password')
  const form = page.locator('form')

  await email.fill('a@b')
  await password.fill('test-password-123')
  expect(
    await email.evaluate(
      element => (element as HTMLInputElement).validity.valid
    )
  ).toBe(true)
  expect(
    await form.evaluate(element => (element as HTMLFormElement).checkValidity())
  ).toBe(true)

  const showPassword = page.getByRole('button', { name: '비밀번호 표시' })
  await showPassword.focus()
  await page.keyboard.press('Enter')
  const hidePassword = page.getByRole('button', { name: '비밀번호 숨기기' })
  await expect(password).toHaveAttribute('type', 'text')
  await expect(hidePassword).toHaveAttribute('aria-pressed', 'true')
  await hidePassword.focus()
  await page.keyboard.press('Enter')
  await expect(password).toHaveAttribute('type', 'password')
  await expect(showPassword).toHaveAttribute('aria-pressed', 'false')

  await page.getByRole('button', { name: '로그인하기' }).click()
  await expect(
    page.getByText('올바른 이메일 주소를 입력해 주세요.')
  ).toBeVisible()
  await expect(email).toHaveAttribute('aria-invalid', 'true')
  await expect(email).toHaveAttribute('aria-describedby', 'email-error')

  await email.fill('person@example.com')
  await expect(
    page.getByText('올바른 이메일 주소를 입력해 주세요.')
  ).toBeHidden()
  expect(
    consoleOutput.some(message => message.includes('test-password-123'))
  ).toBe(false)
})

test('signup native constraints and keyboard checkbox work without an account API', async ({
  page,
}) => {
  const postRequests: string[] = []
  page.on('request', request => {
    if (request.method() === 'POST') postRequests.push(request.url())
  })

  await page.goto('/signup')
  const form = page.locator('form')
  const name = page.getByLabel('이름')
  const email = page.getByLabel('이메일')
  const password = page.getByLabel('비밀번호', { exact: true })
  const confirmation = page.getByLabel('비밀번호 확인')
  const terms = page.getByRole('checkbox', { name: '이용약관에 동의합니다' })

  await name.fill('테스트 사용자')
  await email.fill('foo bar@example.com')
  expect(
    await email.evaluate(
      element => (element as HTMLInputElement).validity.valid
    )
  ).toBe(false)
  await email.fill('person@example.com')
  await password.fill('test-password-123')
  await confirmation.fill('different-password-456')
  await expect(terms).toHaveAttribute('aria-required', 'true')
  await expect(terms).toHaveAttribute('aria-checked', 'false')
  expect(
    await form.evaluate(element => (element as HTMLFormElement).checkValidity())
  ).toBe(false)

  await terms.focus()
  await page.keyboard.press('Space')
  await expect(terms).toHaveAttribute('aria-checked', 'true')
  expect(
    await form.evaluate(element => (element as HTMLFormElement).checkValidity())
  ).toBe(true)

  await page.getByRole('button', { name: '회원가입', exact: true }).click()
  await expect(page).toHaveURL(/\/signup$/)
  expect(postRequests).toEqual([])
})
