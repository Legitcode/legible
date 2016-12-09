import request from '../../src'

describe('request', () => {
  it('returns value from response', async function () {
    let response = await request`
      url: https://freegeoip.net/json/github.com
    `
    expect(response.country_code).to.equal('US')
  })
})
