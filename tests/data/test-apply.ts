import {Apply, Functor} from "../../packages/data";
import {add, peek} from "../helpers";

describe('#data.Apply', () => {
    (<[Apply<any>, Functor<any>, Apply<any>][]>[
        [new Apply(), new Functor(), new Apply()],
        [new Apply(add(10)), new Functor(10), new Apply(20)],
    ]).forEach(([apply, functor, expected]) => {
        it(`apply.ap(${functor}).valueOf() === ${expected.valueOf()}`, () => {
            console.log(apply.ap(new Functor(10)));
            expect(peek('subject', apply.ap(functor).valueOf()))
                .toEqual(peek('expected', expected.valueOf()));
        });
    });
});
