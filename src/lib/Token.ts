/**
 * Token Class
 */

import {Token as TokenType} from './type/Token';
import UIDGenerator = require('uid-generator');

const TOKEN_MIN_SIZE        = 6;   // Characters
const TOKEN_MIN_BITSIZE     = 32;  // Bit-length
const TOKEN_DEFAULT_BITSIZE = 128; // Bit-length
const TOKEN_DEFAULT_EXPIRY  = 30;  // Minutes

class Token
{
  public token:      string;         // Random string
  public generated:  number;         // Unix timestamp (milliseconds)
  public expiry:     (number|null);  // Unix timestamp (milliseconds)

  /**
   * Create a Token instance
   * @param     {int}             [bitSize=TOKEN_DEFAULT_BITSIZE]     - Token bit-length (multiple of 8)
   * @param     {string}          [baseEncoding=UIDGenerator.BASE58]  - Token baseEncoding
   * @param     {int|null}        [expiry=now+30min]                  - Token expiry Unix-timestamp (millisecond)
   * @return    {Promise<Token>}                                      - A Token instance
   * @throw     {Error}                                               - invalid_bitSize | invalid_baseEncoding | invalid_expiry
   */
  public static async create
  (
    bitSize:      number           = TOKEN_DEFAULT_BITSIZE,
    baseEncoding: string           = UIDGenerator.BASE58,
    expiry:       (number|null)    = ( Date.now() + TOKEN_DEFAULT_EXPIRY * 60 * 1000 )
  ):Promise<Token>
  {
    // Test bitSize
    bitSize = Math.round(bitSize/8) * 8;
    if (bitSize < TOKEN_MIN_BITSIZE)
      { throw new Error('invalid_bitSize'); }

    // Test baseEncoding
    if (baseEncoding.length < 2)
      { throw new Error('invalid_baseEncoding'); }

    // Test expiry
    if (expiry !== null)
    {
      expiry = Math.round(expiry);
    }

    // Generate token string
    const uidgen    = new UIDGenerator(bitSize, baseEncoding);
    const random    = await uidgen.generate();
    const generated = Date.now();
    const token     = new Token({
      token:     random,
      generated: generated,
      expiry:    expiry
    });
    return token;
  }

  /**
   * @param {TokenType} token
   * @throw {Error}     - invalid_token | invalid_generated | invalid_expiry
   */
  public constructor(token: TokenType)
  {
    let now = Date.now();

    // Test token string
    if (token.token.length < TOKEN_MIN_SIZE)
      { throw new Error('invalid_token'); }

    // Test generated timestamp
    if (token.generated > now)
      { throw new Error('invalid_generated'); }
    else
      { token.generated = Math.round(token.generated); }

    // Test expiry
    if (token.expiry !== null)
      { token.expiry = Math.round(token.expiry); }

    // Init
    this.token     = token.token;
    this.generated = token.generated;
    this.expiry    = token.expiry;
  }

  public verify(token:string):boolean
  {
    let now = Date.now();

    if (this.expiry === null)
    {
      if (token === this.token)
        { return true; }
      else
        { return false; }
    }
    else
    {
      if (now >= this.expiry || token !== this.token)
        { return false; }
      else
        { return true; }
    }
  }

  public toString():string
  {
    return this.token;
  }
}

export {Token, TokenType};
