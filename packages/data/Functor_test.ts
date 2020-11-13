import {Functor, toFunctor} from '../../packages/data/Functor';
import {falsyList, truthyList} from '../utils/test-utils';

const randomValues = (<any[]>falsyList.concat(<any[]>truthyList));

describe('#Functor', () => {
    it('should be constructable', () => {
        expect(new Functor()).toBeInstanceOf(Functor);
    });
});

describe('#Functor.map', () => {
    randomValues.forEach(x => {
        const f = new Functor(x),
            mappedF = f.map(a => a);
        it('should return an instance of functor.', () => {
            expect(mappedF).toBeInstanceOf(Functor);
        });
        it('newly returned functor should contain expected value', () => {
            mappedF.map(a => expect(a).toEqual(x));
        });
    });
});

describe('#Functor.valueOf', () => {
    randomValues.forEach(x => {
        const f = new Functor(x);
        it('should return contained value', () => {
            expect(f.valueOf()).toEqual(x);
        });
    });
});

describe('#Functor.toFunctor', () => {
    it('should return functors untouched', () => {
        const f = [];
        expect(toFunctor(f)).toEqual(f);
    });
    it('should return a functor regardless of value type', () => {
        randomValues
            .forEach(x =>
                expect(toFunctor(x).map)
                    .toBeInstanceOf(Function));
    });
});
