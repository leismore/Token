# Class Token

The authentication Token class for NodeJS.

## Motivation

Define a universal authentication token class for LMOS NodeJS project.

## Installation

`npm install @leismore/token`

## Example

```
const Token = require('@leismore/token');
let   randomString = 'fowfjowecnnjde';
let   token = new Token(randomString, Date.now(), Date.now()+3600000);
let   tokenForTest = 'cjoejefje';
console.log(token.verify(tokenForTest));
```

## Data Structure

```
Class Token
{
  @attr {string} token      - Random string
  @attr {int}    generated  - The Unix-timestamp at which the token was generated.
  @attr {int}    expire     - The Unix-timestamp at which the token will be expired.
}
```

## Methods

### constructor

```
constructor(token, generated, expire)

@param     {string} token     - Random string
@param     {int}    generated - The Unix-timestamp at which the token was generated.
@param     {int}    expire    - The Unix-timestamp at which the token will be expired.
@exception {Error}            - "invalid token" | "invalid generated" | "invalid expire"

* Unix-timestamp: millisecond
```

### verify

```
verify(token)

@param   {string} token - The token waiting for verification.
@returns {bool}
```

## License

MIT License

Copyright (c) 2019 leismore

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / July 20, 2019)
