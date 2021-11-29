import { expect } from '@jest/globals'

export function see (selector, body) {
  expect(selector.element.value).toBe(body)
}

export function canSee (selector, expected) {
  expect(selector.isVisible()).toBe(expected)
}

export function exist (selector, expected) {
  expect(selector.exists()).toBe(expected)
}

export function containClass (selector, classes, expected) {
  expect(selector.classes(classes)).toBe(expected)
}

export function attrExact (selector, attr, expected) {
  expect(selector.attributes(attr)).toBe(expected)
}
