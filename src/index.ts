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

const UIDGenerator = require('uid-generator');

const TOKEN_MIN_LENGTH        = 6;   // Characters
const TOKEN_MIN_BITLENGTH     = 32;  // Bit-length
const TOKEN_DEFAULT_BITLENGTH = 128; // Bit-length
const TOKEN_DEFAULT_EXPIRE    = 30;  // Minutes

module.exports = class Token
{
  /**
   * Create a Token instance
   * @param     {int}     [bitLength=TOKEN_DEFAULT_BITLENGTH] - Token bit-length (multiple of 8)
   * @param     {int}     [expire=now+30min]                  - Token expiring Unix-timestamp (millisecond)
   * @return    {Promise}                                     - A Token instance
   * @exception {Error}                                       - "invalid bit-length" | "invalid expire"
   */
  static async create
  (
    bitLength = TOKEN_DEFAULT_BITLENGTH,
    expire    = ( Date.now() + TOKEN_DEFAULT_EXPIRE * 60 * 1000 )
  )
  {
    if (typeof bitLength !== 'number' || bitLength < TOKEN_MIN_BITLENGTH)
    {
      throw new Error('invalid bit-length');
    }
    else
    {
      bitLength = Math.round(bitLength/8)*8;
    }

    if (typeof expire !== 'number')
    {
      throw new Error('invalid expire');
    }
    else
    {
      expire = Math.round(expire);
    }

    const uidgen    = new UIDGenerator(bitLength, UIDGenerator.BASE58);
    const random    = await uidgen.generate();
    const generated = Date.now();
    const token     = new Token(random, generated, expire);
    return token;
  }

  constructor(token, generated, expire)
  {
    if (typeof token !== 'string' || token.length < TOKEN_MIN_LENGTH)
    {
      throw new Error('invalid token');
    }

    if (typeof generated !== 'number')
    {
      throw new Error('invalid generated');
    }

    if (typeof expire !== 'number')
    {
      throw new Error('invalid expire');
    }

    Object.defineProperty(this, 'token', {
      value:        token,
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.defineProperty(this, 'generated', {
      value:        Math.round(generated),
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.defineProperty(this, 'expire', {
      value:        Math.round(expire),
      writable:     false,
      enumerable:   false,
      configurable: false
    });

    Object.preventExtensions(this);
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

  toString()
  {
    return this.token;
  }
};
