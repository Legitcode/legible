##Legible

Proof of concept at making http requests easier to work with in JS / Node. This wraps the fetch api.

```
npm install legible --save
```

A request library using template literals. Making requests has never been so straight forward! Make it easy for users to adopt your api, document it using this library, and everyone will understand making requests. 

###Example

```js
import request from 'legible'

async function TestRequest() {
  let response = await request`
    url: https://api.myapp.com/register
    
    body: ${{ 
      email: 'test@test.com', 
      password: 'secret' 
    }}
    
    headers: ${{ 
      Authorization: 'Bearer: token' 
     }}
  `
}
```

##Why Legible?

Using template strings, we can pull out variables easily and keep requests as `legible` as possible. Imagine splitting out your code like this using api libraries that include requests like so:

```js
//api library tweets.js
export { 
  register: `
    url: 'https://api.twitter.com/register', 
    headers: ${{ 
      method: 'POST' 
    }} 
  `,
  tweets: `
    url: https://api.twitter.com/register, 
  `,
 }

//using the library

import request from 'legible'
import methods from './tweets'

request.attach('twitter', methods)

request.twitter.register`
  body: ${{ email: 'test@test.com', password: 'Tester' }}
`
```

###Middleware


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
