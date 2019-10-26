/**
 * Token Class
 */

import {Token as TokenType} from './type/Token';
import {UIDGenerator}       from 'uid-generator';

const TOKEN_MIN_LENGTH        = 6;   // Characters
const TOKEN_MIN_BITLENGTH     = 32;  // Bit-length
const TOKEN_DEFAULT_BITLENGTH = 128; // Bit-length
const TOKEN_DEFAULT_EXPIRY    = 30;  // Minutes

class Token
{
  public token:      string;  // Random string
  public generated:  number;  // Unix timestamp (milliseconds)
  public expiry?:    number;  // Unix timestamp (milliseconds)

  /**
   * Create a Token instance
   * @param     {int}             [bitLength=TOKEN_DEFAULT_BITLENGTH] - Token bit-length (multiple of 8)
   * @param     {int|undefined}   [expiry=now+30min]                  - Token expiry Unix-timestamp (millisecond)
   * @return    {Promise<Token>}                                      - A Token instance
   * @throw     {Error}                                               - invalid_bitLength | invalid_expiry
   */
  public static async create
  (
    bitLength: number           = TOKEN_DEFAULT_BITLENGTH,
    expiry:    number|undefined = ( Date.now() + TOKEN_DEFAULT_EXPIRY * 60 * 1000 )
  ):Promise<Token>
  {
    // Test bitLength
    bitLength = Math.round(bitLength/8) * 8;
    if (bitLength < TOKEN_MIN_BITLENGTH)
      { throw new Error('invalid_bitLength'); }

    // Test expiry
    if (expiry !== undefined)
    {
      expiry = Math.round(expiry);
    }

    // Generate token string
    const uidgen    = new UIDGenerator(bitLength, UIDGenerator.BASE58);
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
    if (token.token.length < TOKEN_MIN_LENGTH)
      { throw new Error('invalid_token'); }

    // Test generated timestamp
    if (token.generated > now)
      { throw new Error('invalid_generated'); }
    else
      { token.generated = Math.round(token.generated); }

    // Test expiry
    if (token.expiry !== undefined)
      { token.expiry = Math.round(token.expiry); }

    // Init
    this.token     = token.token;
    this.generated = token.generated;
    this.expiry    = token.expiry;
  }

  public verify(token:string):boolean
  {
    let now = Date.now();

    if (this.expiry === undefined)
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

export {Token};
