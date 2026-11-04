import {$elem, elem} from "../../src/list/elem";
import {vowelsArray, vowelsString} from "../helpers";

describe('#elem', () => {
  it('should take the list last', () => {
    expect(elem('a', vowelsArray)).toEqual(true);
    expect(elem('a', vowelsString)).toEqual(true);
    expect(elem('z', vowelsArray)).toEqual(false);
    expect(elem('z', vowelsString)).toEqual(false);
    expect(elem('a', [])).toEqual(false);
    expect(elem('a', '')).toEqual(false);
  });
  it('should have a curried form with the same order', () => {
    expect($elem('a')(vowelsArray)).toEqual(true);
    expect($elem('z')(vowelsString)).toEqual(false);
  });
});
