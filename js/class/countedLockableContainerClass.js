function CountedLockableContainerClass(KEY, MAX_KEY_MISMATCH_COUNT) {

    'use strict';

    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';

    var _protected = LockableContainerClass.call(this, KEY);
    _protected.keyMismatchCount = 0;

    function _addKeyMismatchCount() { _protected.keyMismatchCount++; };

    function _hasReachedMaxKeyMismatchCount() {
        return this.keyMismatchCount() >= MAX_KEY_MISMATCH_COUNT;
    };

    function _tryUnlock(key, errback) {
        if (!_protected.isCorrectKey(key)) _addKeyMismatchCount();
        originalTryUnlock.call(this, key, errback);
        if (!_hasReachedMaxKeyMismatchCount.call(this)) return;
        errback(_MSG_MAX_COUNT_REACHED);
    };

    var originalTryUnlock = this.tryUnlock;
    this.tryUnlock = function(key, errback) {
        if (_hasReachedMaxKeyMismatchCount.call(this)) {
            return errback(_MSG_MAX_COUNT_REACHED);
        }
        _tryUnlock.call(this, key, errback);
    };

    this.keyMismatchCount = function() { return _protected.keyMismatchCount; };

    CountedLockableContainerUnitTest(this);

    return _protected;

};
