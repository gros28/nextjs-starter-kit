import assert from 'node:assert/strict'
import test from 'node:test'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'

import { SignupForm } from '../src/components/signup-form'
import { validateLoginForm } from '../src/lib/login-validation'

test('login validation accepts a valid email and eight-character password', () => {
  assert.deepEqual(validateLoginForm('person@example.com', '12345678'), {
    email: '',
    password: '',
  })
})

test('login validation rejects malformed email and passwords under eight characters', () => {
  assert.deepEqual(validateLoginForm('not-an-email', '1234567'), {
    email: '올바른 이메일 주소를 입력해 주세요.',
    password: '비밀번호는 최소 8자 이상이어야 합니다.',
  })
})

test('signup controls use a form with native required and email constraints', () => {
  const markup = renderToStaticMarkup(<SignupForm />)

  assert.match(markup, /<form/)
  assert.match(markup, /<input(?=[^>]*id="name")(?=[^>]*required)[^>]*>/)
  assert.match(
    markup,
    /<input(?=[^>]*id="email")(?=[^>]*type="email")(?=[^>]*required)[^>]*>/
  )
  assert.match(markup, /<button[^>]+type="submit"/)
})
