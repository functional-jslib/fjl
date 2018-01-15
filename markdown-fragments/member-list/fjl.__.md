### fjl.__
Is a static 'frozen' object.  Used as a placeholder variable for `curry_` variants (`curry_*`); 
 E.g.,
```
    import {curry_, __} from 'fjl';
    // ...
    const expectEqual = curry_((a, b) => expect(a).to.equal.(b);
    
    // Example Usage
    compose(expectEqual(__, 99), someOp, someOtherOp)(someValue); 
```

[Back to fjl members list.](#fjl-members-list)
