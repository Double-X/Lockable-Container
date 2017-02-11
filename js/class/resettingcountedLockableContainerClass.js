function ResettingCountedLockableContainerClass(
        CALLBACK, ERRBACK, KEY, MAX_KEY_MISMATCH_COUNT) {

    'use strict';

    var _protected = CountedLockableContainerClass.call(
            this, CALLBACK, ERRBACK, KEY, MAX_KEY_MISMATCH_COUNT);

    function _resetKeyMismatchCount() { _protected.keyMismatchCount = 0; };

    var _originalUnlock = _protected.unlock;
    _protected.unlock = function(key) {
        _originalUnlock.call(this, key);
        _resetKeyMismatchCount();
    };

};
