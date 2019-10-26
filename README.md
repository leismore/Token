# Token Class

The authentication Token class for NodeJS.

# Donation

Buy me a coffee via [![PayPal Donation](https://www.paypalobjects.com/en_AU/i/btn/btn_donateCC_LG.gif)](https://www.paypal.com/cgi-bin/webscr?cmd=_donations&business=SPPJPYRY4D6WC&item_name=Give+people+an+option+to+support+my+open+source+software.&currency_code=AUD&source=url)

## Motivation

Define a universal authentication token class for LMOS NodeJS project.

## Installation

`npm install @leismore/token`

## Example

```typescript
import {Token} from '@leismore/token';
// Or
const Token = require('@leismore/token').Token;

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

  /**
   * @param {TokenType} token
   * @throw {Error}     - invalid_token | invalid_generated | invalid_expiry
   */
  public constructor(token: TokenType)

  public verify(token:string):boolean

  public toString():string
}

type Token = {
  token:     string,    // Random string
  generated: number,    // Unix timestamp (milliseconds)
  expiry?:   number     // Unix timestamp (milliseconds)
};

const TOKEN_MIN_LENGTH        = 6;   // Characters
const TOKEN_MIN_BITLENGTH     = 32;  // Bit-length
const TOKEN_DEFAULT_BITLENGTH = 128; // Bit-length
const TOKEN_DEFAULT_EXPIRY    = 30;  // Minutes
```

## License

MIT License

## Authors

* [Kyle Chine](https://www.kylechine.name) (Initial Author / July 20, 2019)
