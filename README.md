[![CircleCI](https://circleci.com/gh/Legitcode/legible.svg?style=svg)](https://circleci.com/gh/Legitcode/legible)
[![All Contributors](https://img.shields.io/badge/all_contributors-2-orange.svg?style=flat-square)](#contributors)
##Legible

[See my blog post on why I made this](https://zach.codes/human-readable-ajax-requests/)

Proof of concept at making http requests easier to work with in JS / Node. This wraps the fetch api.

```
npm install legible --save
```

A request library using template literals. Making requests has never been so straight forward! Make it easy for users to adopt your api, document it using this library, and everyone will understand making requests.

###Example

```js
import request from 'legible'

async function TestRequest() {
  let body = {
    email: 'test@test.com',
    password: 'secret'
  }

  let response = await request`
    url: https://api.myapp.com/register
    method: POST
    body: ${body}
    headers: ${{
      Authorization: 'Bearer: token'
    }}
  `
}
```

##Why Legible?

**New in 0.2.0!**


Using template strings, we can pull out variables easily and keep requests as `legible` as possible. Imagine splitting out your code like this using api libraries that include requests like so:

```js
import { partial } from 'legible'

const twitter = {
  register: partial`
    url: https://api.twitter.com/register,
    method: POST
  `
}

twitter.register`
  body: ${{
    email: 'test@test.com',
    password: 'Tester'
  }}
`
```

###Middleware

**Coming Soon** The following isn't implemented yet.


```js
import request from 'legible'

request.middleware({
  headers: {
    Authorization: `Bearer: ${localStorage.getItem('token')}`
  },
  after({ headers }) {
    localStorage.setItem('token', headers.Authorization)
  }
})
```

## Contributors

Thanks goes to these wonderful people ([emoji key](https://github.com/kentcdodds/all-contributors#emoji-key)):

<!-- ALL-CONTRIBUTORS-LIST:START - Do not remove or modify this section -->
| [<img src="https://avatars.githubusercontent.com/u/449136?v=3" width="100px;"/><br /><sub>Zach Silveira</sub>](http://reactjsnews.com)<br />[💻](https://github.com/Legitcode/legible/commits?author=zackify) [📖](https://github.com/Legitcode/legible/commits?author=zackify) 👀 | [<img src="https://avatars.githubusercontent.com/u/5465958?v=3" width="100px;"/><br /><sub>Ray Gesualdo</sub>](https://github.com/raygesualdo)<br />[💻](https://github.com/Legitcode/legible/commits?author=raygesualdo) [📖](https://github.com/Legitcode/legible/commits?author=raygesualdo) |
| :---: | :---: |
<!-- ALL-CONTRIBUTORS-LIST:END -->

This project follows the [all-contributors](https://github.com/kentcdodds/all-contributors) specification. Contributions of any kind welcome!
