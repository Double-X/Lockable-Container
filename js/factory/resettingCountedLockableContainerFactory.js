function ResettingCountedLockableContainerFactory(Parent) {

    'use strict';

    function _createdCountedLockableContainer() {
        var args = arguments[0];
        return _resettingCountedLockableContainer(args[1], args[2]);
    };

    function _resettingCountedLockableContainer(key, count) {
        var resettingCountedLockableContainer = 
                new ResettingCountedLockableContainer(key, count);
        return {
            isLocked: resettingCountedLockableContainer.isLocked.bind(
                    resettingCountedLockableContainer),
            lock: resettingCountedLockableContainer.lock.bind(
                    resettingCountedLockableContainer),
            tryPutContents: 
                    resettingCountedLockableContainer.tryPutContents.bind(
                    resettingCountedLockableContainer),
            tryTakeContents: 
                    resettingCountedLockableContainer.tryTakeContents.bind(
                    resettingCountedLockableContainer),
            tryUnlock: resettingCountedLockableContainer.tryUnlock.bind(
                    resettingCountedLockableContainer),
            keyMismatchCount: 
                    resettingCountedLockableContainer.keyMismatchCount.bind(
                    resettingCountedLockableContainer)
        };
    };

    function ResettingCountedLockableContainer() {
        this.initialize.apply(this, arguments);
    };
    ResettingCountedLockableContainer.prototype = Object.create(Parent);
    ResettingCountedLockableContainer.prototype.constructor = 
            ResettingCountedLockableContainer;

    ResettingCountedLockableContainer.prototype._unlock = function() {
        Parent._unlock.call(this);
        this._resetKeyMismatchCount();
    };

    return _createdCountedLockableContainer.bind(this);

};
