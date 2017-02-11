function CountedLockableContainerClass(
        CALLBACK, ERRBACK, KEY, MAX_KEY_MISMATCH_COUNT) {

    'use strict';

    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';

    var _protected = LockableContainerClass.call(this, CALLBACK, ERRBACK, KEY);
    _protected.keyMismatchCount = 0;

    function _addKeyMismatchCount() { _protected.keyMismatchCount++; };

    function _hasReachedMaxKeyMismatchCount() {
        return this.keyMismatchCount() >= MAX_KEY_MISMATCH_COUNT;
    };

    var originalTryUnlock = this.tryUnlock;
    this.tryUnlock = function(key) {
        if (_hasReachedMaxKeyMismatchCount.call(this)) {
            return ERRBACK(_MSG_MAX_COUNT_REACHED);
        }
        _tryUnlock.call(this, key);
    };

    this.keyMismatchCount = function() { return _protected.keyMismatchCount; };

    function _tryUnlock(key) {
        if (!_protected.isCorrectKey(key)) _addKeyMismatchCount();
        originalTryUnlock.call(this, key);
        if (!_hasReachedMaxKeyMismatchCount.call(this)) return;
        ERRBACK(_MSG_MAX_COUNT_REACHED);
    };

    CountedLockableContainerUnitTest(this);

    return _protected;

};
