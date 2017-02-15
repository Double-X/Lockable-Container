function ResettableCountedLockableContainerClass(KEY, MAX_KEY_MISMATCH_COUNT) {

    'use strict';

    var _MSG_LOCKED = 'This container is locked';

    var _protected = CountedLockableContainerClass.call(
            this, KEY, MAX_KEY_MISMATCH_COUNT);

    function _resetKeyMismatchCount() { _protected.keyMismatchCount = 0; };

    this.tryResetKeyMismatchCount = function(errback) {
        this.isLocked() ? errback(_MSG_LOCKED) : _resetKeyMismatchCount();
    };

};
