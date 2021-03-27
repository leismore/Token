import { assert } from 'chai';
import { Token } from '../src/index';
import UIDGenerator = require('uid-generator');

describe('Token class', function(){
    describe('create method', function(){
        it('Without parameters', async function(){
            let t = await Token.create();
            assert(t instanceof Token);
        });
        it('With all parameters', async function(){
            let t = await Token.create(512, UIDGenerator.BASE71, (Date.now() + 60 * 60 * 1000));
            assert(t instanceof Token);
        });
        it('With only expire', async function(){
            let t = await Token.create(undefined, undefined, (Date.now() + 60 * 60 * 1000));
            assert(t instanceof Token);
        });
        it('Non-expire', async function(){
            let t = await Token.create(undefined, undefined, null);
            assert(t instanceof Token);
        });
        it('With invalid bitSize', async function(){
            try
            { let t = await Token.create(130); }
            catch(e)
            {
              assert.throws(function(){
              throw e;
              }, Error, 'invalid_bitSize');
            }
        });
    });
    describe('toString method', function(){
        it('Convert to token text', async function(){
            let t = await Token.create();
            assert(t.token === String(t));
        });
    });
    describe('verify method', async function(){
        it('Normal', async function(){
            let t = await Token.create();
            assert(t.verify(t.token));
        });
        it('Non-expiring token', async function(){
            let t = await Token.create(undefined, undefined, null);
            assert(t.verify(t.token));
        });
        it('Expired token', async function(){
            let t = await Token.create(undefined, undefined, Date.now()-1);
            assert(t.verify(t.token) === false);
        });
    });
});