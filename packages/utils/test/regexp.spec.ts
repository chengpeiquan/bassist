import { describe, expect, it } from 'vitest'
import { isMob, isEmail, isUrl, isIdCard, isBankCard, isIPv4, isIPv6 } from '..'

describe('isMob', () => {
  it('Valid data', () => {
    expect(isMob(13800138000)).toBeTruthy()
    expect(isMob('13800138000')).toBeTruthy()
    expect(isMob('13100000000')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isMob('13800138000 ')).toBeFalsy()
    expect(isMob('1380013800')).toBeFalsy()
    expect(isMob(123456)).toBeFalsy()
    expect(isMob('hello')).toBeFalsy()
  })
})

describe('isEmail', () => {
  it('Valid data', () => {
    expect(isEmail('abc@qq.com')).toBeTruthy()
    expect(isEmail('123456@qq.com')).toBeTruthy()
    expect(isEmail('test@163.com')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isEmail('abc@qq.com ')).toBeFalsy()
    expect(isEmail('abc@q q.com ')).toBeFalsy()
    expect(isEmail('abc@qq')).toBeFalsy()
    expect(isEmail('@qq.com')).toBeFalsy()
    expect(isEmail('hello')).toBeFalsy()
  })
})

describe('isUrl', () => {
  it('Valid data', () => {
    expect(isUrl('http://example.com')).toBeTruthy()
    expect(isUrl('https://example.com')).toBeTruthy()
    expect(isUrl('https://example.com ')).toBeTruthy()
    expect(isUrl('https://example.com/')).toBeTruthy()
    expect(isUrl('https://foo.example.com')).toBeTruthy()
    expect(isUrl('https://foo.bar.example.com')).toBeTruthy()
    expect(isUrl('https://example.com/foo')).toBeTruthy()
    expect(isUrl('https://example.com/foo/bar')).toBeTruthy()
    expect(isUrl('https://example.com/foo/bar/baz')).toBeTruthy()
    expect(isUrl('https://example.com/foo?a=1')).toBeTruthy()
    expect(isUrl('https://example.com/foo?a=1&b=2')).toBeTruthy()
    expect(isUrl('https://example.com/foo?a=1#b=2')).toBeTruthy()
    expect(isUrl('https://example.com/foo#a=1?b=2')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isUrl('http:example.com')).toBeFalsy()
    expect(isUrl('http:/example.com')).toBeFalsy()
    expect(isUrl('https://example..com')).toBeFalsy()
    expect(isUrl('https://foo..example.com')).toBeFalsy()
    expect(isUrl('hello')).toBeFalsy()
  })
})

describe('isIdCard', () => {
  // https://www.bjcourt.gov.cn/zxxx/indexOld.htm?jbfyId=17&zxxxlx=100013002
  // http://legal.people.com.cn/n1/2020/0424/c42510-31687296.html
  it('Valid data', () => {
    expect(isIdCard('110223790813697')).toBeTruthy()
    expect(isIdCard('110225196403026127')).toBeTruthy()
    expect(isIdCard('152221198906101419')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isIdCard('1102237908136971')).toBeFalsy()
    expect(isIdCard('1102221974****4827')).toBeFalsy()
    expect(isIdCard('123456')).toBeFalsy()
    expect(isIdCard('hello')).toBeFalsy()
  })
})

describe('isBankCard', () => {
  // https://ddu1222.github.io/bankcard-validator/bcBuilder.html
  it('Valid data', () => {
    expect(isBankCard('5124255722414430')).toBeTruthy()
    expect(isBankCard('5149570635749446')).toBeTruthy()
    expect(isBankCard('4357458903454875')).toBeTruthy()
    expect(isBankCard('6223508057942120')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isBankCard('151242557224144301')).toBeFalsy()
    expect(isBankCard('123456')).toBeFalsy()
    expect(isBankCard('hello')).toBeFalsy()
  })
})

describe('isIPv4', () => {
  it('Valid data', () => {
    expect(isIPv4('0.0.0.0')).toBeTruthy()
    expect(isIPv4('1.2.3.4')).toBeTruthy()
    expect(isIPv4('127.0.0.1')).toBeTruthy()
    expect(isIPv4('192.168.0.1')).toBeTruthy()
    expect(isIPv4('10.24.3.68')).toBeTruthy()
    expect(isIPv4('45.150.220.38')).toBeTruthy()
    expect(isIPv4('255.255.255.0')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isIPv4('123')).toBeFalsy()
    expect(isIPv4('localhost')).toBeFalsy()
    expect(isIPv4('999.999.999.999')).toBeFalsy()
    expect(isIPv4('192.168.1')).toBeFalsy()
  })
})

describe('isIPv6', () => {
  it('Valid data', () => {
    expect(isIPv6('2001:0DB8:0000:0023:0008:0800:200C:417A')).toBeTruthy()
    expect(isIPv6('2001:DB8:0:23:8:800:200C:417A')).toBeTruthy()
    expect(isIPv6('FF01:0:0:0:0:0:0:1101')).toBeTruthy()
    expect(isIPv6('FF01::1101')).toBeTruthy()
    expect(isIPv6('0:0:0:0:0:0:0:1')).toBeTruthy()
    expect(isIPv6('::1')).toBeTruthy()
    expect(isIPv6('0:0:0:0:0:0:0:0')).toBeTruthy()
    expect(isIPv6('::')).toBeTruthy()
    expect(isIPv6('::192.168.0.1')).toBeTruthy()
    expect(isIPv6('::FFFF:192.168.0.1')).toBeTruthy()
  })
  it('Invalid data', () => {
    expect(isIPv6('123')).toBeFalsy()
    expect(isIPv6('localhost')).toBeFalsy()
    expect(isIPv6('999.999.999.999')).toBeFalsy()
    expect(isIPv6('192.168.1')).toBeFalsy()
    expect(isIPv6('0.0.0.0')).toBeFalsy()
    expect(isIPv6('1.2.3.4')).toBeFalsy()
    expect(isIPv6('127.0.0.1')).toBeFalsy()
    expect(isIPv6('192.168.0.1')).toBeFalsy()
    expect(isIPv6('10.24.3.68')).toBeFalsy()
    expect(isIPv6('45.150.220.38')).toBeFalsy()
    expect(isIPv6('255.255.255.0')).toBeFalsy()
  })
})
