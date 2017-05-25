import request from '../../src';

describe('request', () => {
  it('returns value from response', async function() {
    let response = await request`
      url: https://freegeoip.net/json/github.com
    `;
    expect(response.country_code).to.equal('US');
  });

  it('returns headers on response', async function() {
    await request`
      url: https://freegeoip.net/json/github.com
      onResponse: ${response => {
      expect(response.headers.get('content-type')).to.equal('application/json');
    }}
    `;
  });
});
