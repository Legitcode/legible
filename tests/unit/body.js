import processBody from '../../src/utilities/body'

describe('processBody', () => {
  it('returns null when no value is passed', () => {
    const body = processBody()
    expect(body).to.equal(null)
  })

  it('returns null when empty string is passed', () => {
    const body = processBody('')
    expect(body).to.equal(null)
  })

  it('returns input when FormData is passed', () => {
    const fd = new FormData()
    const body = processBody(fd)
    expect(body).to.equal(fd)
  })

  it('returns input when stringified data is passed', () => {
    const data = JSON.stringify({value: 'test'})
    const body = processBody(data)
    expect(body).to.equal(data)
  })

  it('returns stringified data when object is passed', () => {
    const rawData = {value: 'test'}
    const data = JSON.stringify(rawData)
    const body = processBody(rawData)
    expect(body).to.equal(data)
  })
})
