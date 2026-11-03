/**
 * Behaviours pinned by the #122 review, for methods not covered directly elsewhere.
 */
import {randChar, randStr} from "../../src/string";

describe('string/ behaviour review', () => {
  describe('#randChar', () => {
    it('should stay within given code point range', () => {
      for (let i = 0; i < 50; i += 1) {
        const code = randChar(97, 99).codePointAt(0);
        expect(code >= 97 && code <= 99).toEqual(true);
      }
    });

    it('should support code points above `0xFFFF`', () => {
      expect(randChar(0x1F600, 0x1F600)).toEqual('😀');
    });
  });

  describe('#randStr', () => {
    it('should return a string of random characters', () => {
      const str = randStr(97, 99);
      expect(typeof str).toEqual('string');
      expect(str.length).toEqual(3);
      expect(str.split('').every(x => 'abc'.includes(x))).toEqual(true);
    });
  });
});
