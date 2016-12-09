import findLine from '../../src/utilities/find-line'

const passToNormalize = (strings, ...vars) => normalize(strings, vars)

describe('fineLine', () => {
  it('returns line value for url', () => {
    let lines = [
      'blah: true',
      'url: https://google.com'
    ]

    expect(findLine('url', lines)).to.equal('https://google.com')
  })

  
})