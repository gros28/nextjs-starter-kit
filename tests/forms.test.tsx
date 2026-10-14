import assert from 'node:assert/strict'
import test from 'node:test'
import React, { act } from 'react'
import { JSDOM } from 'jsdom'
import { renderToStaticMarkup } from 'react-dom/server'

import { LoginForm } from '../src/components/login-form'
import { SignupForm } from '../src/components/signup-form'
import { validateLoginForm } from '../src/lib/login-validation'

test('login validation accepts a valid email and eight-character password', () => {
  assert.deepEqual(validateLoginForm('person@example.com', '12345678'), {
    email: '',
    password: '',
  })
})

test('login validation rejects malformed emails and weak passwords', () => {
  assert.deepEqual(validateLoginForm('not-an-email', '1234567'), {
    email: '올바른 이메일 주소를 입력해 주세요.',
    password: '비밀번호는 최소 8자 이상이어야 합니다.',
  })
  for (const email of ['foo bar@example.com', '@@a@b.c', 'a@@b.c', 'a@b.c ']) {
    assert.notEqual(validateLoginForm(email, '12345678').email, '')
  }
  assert.notEqual(
    validateLoginForm('person@example.com', '        ').password,
    ''
  )
})

test('login form submits through its validator and displays the email error', async () => {
  const dom = new JSDOM(
    '<!doctype html><html><body><div id="root"></div></body></html>',
    {
      url: 'http://localhost',
    }
  )
  const previousGlobals = {
    window: globalThis.window,
    self: (globalThis as typeof globalThis & { self?: Window }).self,
    document: globalThis.document,
    navigator: globalThis.navigator,
    IS_REACT_ACT_ENVIRONMENT: (
      globalThis as typeof globalThis & {
        IS_REACT_ACT_ENVIRONMENT?: boolean
      }
    ).IS_REACT_ACT_ENVIRONMENT,
  }
  Object.defineProperties(globalThis, {
    window: { configurable: true, value: dom.window },
    self: { configurable: true, value: dom.window },
    document: { configurable: true, value: dom.window.document },
    navigator: { configurable: true, value: dom.window.navigator },
    IS_REACT_ACT_ENVIRONMENT: { configurable: true, value: true },
  })

  const { createRoot } = await import('react-dom/client')
  const root = createRoot(dom.window.document.getElementById('root')!)
  try {
    act(() => root.render(<LoginForm />))
    const form = dom.window.document.querySelector('form')!
    const email = dom.window.document.querySelector<HTMLInputElement>('#email')!
    const password =
      dom.window.document.querySelector<HTMLInputElement>('#password')!
    assert.equal(form.tagName, 'FORM')
    assert.equal(email.type, 'email')
    assert.equal(email.required, true)
    assert.equal(password.required, true)
    assert.equal(
      form.querySelector('button[type="submit"]')?.textContent,
      '로그인하기'
    )

    act(() => {
      const setValue = Object.getOwnPropertyDescriptor(
        dom.window.HTMLInputElement.prototype,
        'value'
      )!.set!
      setValue.call(email, 'a@b')
      assert.equal(email.validity.typeMismatch, false)
      email.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      setValue.call(password, '12345678')
      password.dispatchEvent(new dom.window.Event('input', { bubbles: true }))
      form.dispatchEvent(
        new dom.window.Event('submit', { bubbles: true, cancelable: true })
      )
    })

    const error = dom.window.document.querySelector('#email-error')
    assert.equal(error?.textContent, '올바른 이메일 주소를 입력해 주세요.')
    assert.equal(email.getAttribute('aria-invalid'), 'true')
    assert.equal(email.getAttribute('aria-describedby'), 'email-error')
  } finally {
    act(() => root.unmount())
    dom.window.close()
    Object.defineProperties(globalThis, {
      window: { configurable: true, value: previousGlobals.window },
      self: { configurable: true, value: previousGlobals.self },
      document: { configurable: true, value: previousGlobals.document },
      navigator: { configurable: true, value: previousGlobals.navigator },
      IS_REACT_ACT_ENVIRONMENT: {
        configurable: true,
        value: previousGlobals.IS_REACT_ACT_ENVIRONMENT,
      },
    })
  }
})

test('signup controls use a semantic form and native required constraints', () => {
  const markup = renderToStaticMarkup(<SignupForm />)

  assert.match(markup, /<form/)
  assert.match(markup, /<input(?=[^>]*id="name")(?=[^>]*required)[^>]*>/)
  assert.match(
    markup,
    /<input(?=[^>]*id="email")(?=[^>]*type="email")(?=[^>]*required)[^>]*>/
  )
  assert.match(markup, /<input(?=[^>]*id="password")(?=[^>]*required)[^>]*>/)
  assert.match(
    markup,
    /<input(?=[^>]*id="confirmPassword")(?=[^>]*required)[^>]*>/
  )
  assert.match(
    markup,
    /<button(?=[^>]*role="checkbox")(?=[^>]*aria-required="true")[^>]*>/
  )
  assert.match(markup, /<input(?=[^>]*type="checkbox")(?=[^>]*required)[^>]*>/)
  assert.match(markup, /<button[^>]+type="submit"/)

  const dom = new JSDOM(markup)
  const form = dom.window.document.querySelector('form')!
  for (const [id, value] of [
    ['name', '홍길동'],
    ['email', 'person@example.com'],
    ['password', 'password123'],
    ['confirmPassword', 'password123'],
  ]) {
    dom.window.document.querySelector<HTMLInputElement>(`#${id}`)!.value = value
  }
  const terms = form.querySelector<HTMLInputElement>('input[type="checkbox"]')!
  assert.equal(form.checkValidity(), false)
  terms.checked = true
  assert.equal(form.checkValidity(), true)
  dom.window.document.querySelector<HTMLInputElement>('#email')!.value =
    'foo bar@example.com'
  assert.equal(form.checkValidity(), false)
  dom.window.close()
})
