import normalize from '../../src/utilities/normalize'

const passToNormalize = (strings, ...vars) => normalize(strings, vars)

describe('normalize', () => {
  it('returns correct fetch options for get request', () => {

    let { url, options } = passToNormalize`
      url: http://test.app/settings/user/19
      method: GET
    `

    expect(url).to.equal('http://test.app/settings/user/19')
    expect(options.method).to.equal('GET')
  })

  it('returns url when it is a variable', () => {

    let { url, options } = passToNormalize`
      url: ${`http://test.app/${1}`}
      method: POST
    `

    expect(url).to.equal('http://test.app/1')
    expect(options.method).to.equal('POST')

  })

  it('returns body on post request', () => {

    let { url, options } = passToNormalize`
      url: http://test.app
      method: POST
      body: ${{ name: 'Bobby'}}
    `

    expect(url).to.equal('http://test.app')
    expect(options.method).to.equal('POST')
    expect(options.body).to.equal('{"name":"Bobby"}')

  })

  it('returns headers on post request', () => {

    let { url, options } = passToNormalize`
      url: http://test.app
      method: POST
      headers: ${{ Authorization: 'Bearer: Fake'}}
    `

    expect(url).to.equal('http://test.app')
    expect(options.method).to.equal('POST')
    expect(options.headers.Authorization).to.equal('Bearer: Fake')

  })

  it('returns headers and body on post request', () => {

    let { url, options } = passToNormalize`
      url: http://test.app
      method: POST
      headers: ${{ Authorization: 'Bearer: Fake'}}
      body: ${{ name: 'Bobby'}}
    `

    expect(url).to.equal('http://test.app')
    expect(options.method).to.equal('POST')
    expect(options.body).to.equal('{"name":"Bobby"}')
    expect(options.headers.Authorization).to.equal('Bearer: Fake')

  })

  it('returns headers and body on post request in reverse', () => {

    let { url, options } = passToNormalize`
      url: http://test.app
      method: POST
      body: ${{ name: 'Bobby'}}
      headers: ${{ Authorization: 'Bearer: Fake'}}
    `

    expect(url).to.equal('http://test.app')
    expect(options.method).to.equal('POST')
    expect(options.body).to.equal('{"name":"Bobby"}')
    expect(options.headers.Authorization).to.equal('Bearer: Fake')

  })
})