/**
 * Class Token
 * @param     {string} token     - Random string
 * @param     {int}    generated - The Unix-timestamp at which the token was generated.
 * @param     {int}    expire    - The Unix-timestamp at which the token will be expired.
 * @exception {Error}            - "invalid token" | "invalid generated" | "invalid expire"
 *
 * Token
 * {
 *   @attr {string} token
 *   @attr {int}    generated
 *   @attr {int}    expire
 * }
 *
 * * Unix-timestamp: millisecond
 */

'use strict';

const TOKEN_MIN_LENGTH = 6;

module.exports = class Token
{
  constructor(token, generated, expire)
  {
    if (typeof token !== 'string' || token.length < TOKEN_MIN_LENGTH)
    {
      throw new Error('invalid token');
    }

    if (typeof generated !== 'number' || generated < 0)
    {
      throw new Error('invalid generated');
    }

    if (typeof expire !== 'number' || expire < 0)
    {
      throw new Error('invalid expire');
    }

    this.token     = token;
    this.generated = Math.round(generated);
    this.expire    = Math.round(expire);
  }

  verify(token)
  {
    let now = Date.now();

    if (now >= this.expire || token !== this.token)
    {
      return false;
    }
    else
    {
      return true;
    }
  }
};
