function ResettableCountedLockableContainerObject() {

    'use strict';

    var _PARENT = arguments[0][arguments[0].length];
    var _MSG_LOCKED = 'This container is locked';

    function _resettableCountedLockableContainer(key, maxKeyMismatchCount) {
        _PARENT._init(key, maxKeyMismatchCount);
        return {
            isLocked: _PARENT.isLocked.bind(_PARENT),
            lock: _PARENT.lock.bind(_PARENT),
            tryPutContents: _PARENT.tryPutContents.bind(_PARENT),
            tryTakeContents: _PARENT.tryTakeContents.bind(_PARENT),
            tryUnlock: _PARENT.tryUnlock.bind(_PARENT),
            keyMismatchCount: _PARENT.keyMismatchCount.bind(_PARENT),
            tryResetKeyMismatchCount: 
                    _PARENT.tryResetKeyMismatchCount.bind(_PARENT)
        };
    };

    _PARENT.tryResetKeyMismatchCount = function(errback) {
        if (_PARENT.isLocked()) return errback(_MSG_LOCKED);
        _PARENT._resetKeyMismatchCount();
    };

    return _resettableCountedLockableContainer(
            arguments[0][1], arguments[0][2]);

};
