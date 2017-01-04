import fetch from '../../src/utilities/fetch'

describe('fetch', () => {
  it('returns value from response', async function () {
    let response = await fetch('https://freegeoip.net/json/github.com')

    expect(response.country_code).to.equal('US')
  })
})
