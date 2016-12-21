import { partial } from '../../src'

describe('partial', () => {
  it('returns value from response', async function () {
    const requests = {
      login: partial`
        url: https://freegeoip.net/json/github.com
      `
    }

    let response = await requests.login`
      method: GET
    `
    expect(response.country_code).to.equal('US')
  })

  it('returns a new function', async function () {
    expect(typeof partial`url: https://freegeoip.net/json/github.com`).to.equal('function')
  })

  it('overwrites partial data', async function () {
    const requests = {
      login: partial`
        url: https://freegeoip.net/json/github.com
        method: POST
      `
    }

    let response = await requests.login`
      method: GET
    `
    expect(response.country_code).to.equal('US')
  })
})
