function ResettingCountedLockableContainerObject() {

    'use strict';

    var _PARENT = arguments[0][arguments[0].length];

    function _resettingCountedLockableContainer(key, maxKeyMismatchCount) {
        _PARENT._init(key, maxKeyMismatchCount);
        return {
            isLocked: _PARENT.isLocked.bind(_PARENT),
            lock: _PARENT.lock.bind(_PARENT),
            tryPutContents: _PARENT.tryPutContents.bind(_PARENT),
            tryTakeContents: _PARENT.tryTakeContents.bind(_PARENT),
            tryUnlock: _PARENT.tryUnlock.bind(_PARENT),
            keyMismatchCount: _PARENT.keyMismatchCount.bind(_PARENT)
        };
    };

    var _originalUnlock = _PARENT._unlock;
    _PARENT._unlock = function() {
        _originalUnlock.call(_PARENT);
        _PARENT._resetKeyMismatchCount();
    };

    return _resettingCountedLockableContainer(arguments[0][1], arguments[0][2]);

};
