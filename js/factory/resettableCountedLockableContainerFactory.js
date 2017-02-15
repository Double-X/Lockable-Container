function ResettableCountedLockableContainerFactory(Parent) {

    'use strict';

    var _MSG_LOCKED = 'This container is locked';

    function _createdCountedLockableContainer() {
        var args = arguments[0];
        return _resettableCountedLockableContainer(args[1], args[2]);
    };

    function _resettableCountedLockableContainer(key, count) {
        var resettableCountedLockableContainer = 
                new ResettableCountedLockableContainer(key, count);
        return {
            isLocked: resettableCountedLockableContainer.isLocked.bind(
                    resettableCountedLockableContainer),
            lock: resettableCountedLockableContainer.lock.bind(
                    resettableCountedLockableContainer),
            tryPutContents: 
                    resettableCountedLockableContainer.tryPutContents.bind(
                    resettableCountedLockableContainer),
            tryTakeContents: 
                    resettableCountedLockableContainer.tryTakeContents.bind(
                    resettableCountedLockableContainer),
            tryUnlock: resettableCountedLockableContainer.tryUnlock.bind(
                    resettableCountedLockableContainer),
            keyMismatchCount: 
                    resettableCountedLockableContainer.keyMismatchCount.bind(
                    resettableCountedLockableContainer),
            tryResetKeyMismatchCount: resettableCountedLockableContainer.
                    tryResetKeyMismatchCount.bind(
                    resettableCountedLockableContainer)
        };
    };

    function ResettableCountedLockableContainer() {
        this.initialize.apply(this, arguments);
    };
    ResettableCountedLockableContainer.prototype = Object.create(Parent);
    ResettableCountedLockableContainer.prototype.constructor = 
            ResettableCountedLockableContainer;

    ResettableCountedLockableContainer.prototype.tryResetKeyMismatchCount
            = function(errback) {
        this.isLocked() ? errback(_MSG_LOCKED) : this._resetKeyMismatchCount();
    };

    return _createdCountedLockableContainer.bind(this);

};
