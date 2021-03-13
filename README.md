# Token Class

The authentication Token class for NodeJS.

# Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Motivation

Define a universal authentication token class for LMOS NodeJS project.

## Installation

`npm install @leismore/token`

## Test

`npm test`

## Example

```typescript
import {Token} from '@leismore/token';

Token.create().then(token=>{
  console.log(String(token));
});
```

## API

```typescript
class Token
{
  public token:      string;  // Random string
  public generated:  number;  // Unix timestamp (milliseconds)
  public expiry?:    number;  // Unix timestamp (milliseconds)

  /**
   * Create a Token instance
   * @param     {int}             [bitSize=TOKEN_DEFAULT_BITSIZE]     - Token bit-length (multiple of 8)
   * @param     {string}          [baseEncoding=UIDGenerator.BASE58]  - Token baseEncoding
   * @param     {int|undefined}   [expiry=now+30min]                  - Token expiry Unix-timestamp (millisecond)
   * @return    {Promise<Token>}                                      - A Token instance
   * @throw     {Error}                                               - invalid_bitSize | invalid_baseEncoding | invalid_expiry
   */
  public static async create
  (
    bitSize:      number           = TOKEN_DEFAULT_BITSIZE,
    baseEncoding: string           = UIDGenerator.BASE58,
    expiry:       number|undefined = ( Date.now() + TOKEN_DEFAULT_EXPIRY * 60 * 1000 )
  ):Promise<Token>

  /**
   * @param {TokenData} token
   * @throw {Error}     - invalid_token | invalid_generated | invalid_expiry
   */
  public constructor(token: TokenData)

  public verify(token:string):boolean

  public toString():string
}

type TokenData = {
  token:     string,    // Random string
  generated: number,    // Unix timestamp (milliseconds)
  expiry?:   number     // Unix timestamp (milliseconds)
};

const TOKEN_MIN_SIZE        = 6;   // Characters
const TOKEN_MIN_BITSIZE     = 32;  // Bit-length
const TOKEN_DEFAULT_BITSIZE = 128; // Bit-length
const TOKEN_DEFAULT_EXPIRY  = 30;  // Minutes
```

## License

GNU Affero General Public License v3.0

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / July 20, 2019)

## Credit

* This package is based on [uid-generator at NPM](https://www.npmjs.com/package/uid-generator)
