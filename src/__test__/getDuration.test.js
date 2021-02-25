// to solve ReferenceError: regeneratorRuntime is not defined
// https://knowledge.udacity.com/questions/174638
import 'babel-polyfill'
import { getDuration } from '../client/js/app'

describe('Testing Get Get Duration functionality', () => {
  test('It should return true because the function is defined', () => {
    expect(getDuration).toBeDefined()
  })
  test('It should return true as getTripDetails is a function', () => {
    expect(typeof getDuration).toBe('function')
  })
})