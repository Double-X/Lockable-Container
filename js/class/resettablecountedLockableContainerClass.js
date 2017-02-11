function ResettableCountedLockableContainerClass(
        CALLBACK, ERRBACK, KEY, MAX_KEY_MISMATCH_COUNT) {

    'use strict';

    var _MSG_LOCKED = 'This container is locked';

    var _protected = CountedLockableContainerClass.call(
            this, CALLBACK, ERRBACK, KEY, MAX_KEY_MISMATCH_COUNT);

    function _resetKeyMismatchCount() { _protected.keyMismatchCount = 0; };

    this.tryResetKeyMismatchCount = function() {
        this.isLocked() ? ERRBACK(_MSG_LOCKED) : _resetKeyMismatchCount();
    };

};
