function CountedLockableContainer() { this.initialize.apply(this, arguments); };

(function(Parent) {

    'use strict';

    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';

    function _addKeyMismatchCount() { this._keyMismatchCount++; };

    function _hasReachedMaxKeyMismatchCount() {
        return this.keyMismatchCount() >= this._MAX_KEY_MISMATCH_COUNT;
    };

    CountedLockableContainer.prototype = Object.create(Parent);
    CountedLockableContainer.prototype.constructor = CountedLockableContainer;

    CountedLockableContainer.prototype.initialize = 
            function(callback, errback, key, maxKeyMismatchCount) {
        Parent.initialize.call(this, callback, errback, key);
        this._MAX_KEY_MISMATCH_COUNT = maxKeyMismatchCount;
    };

    CountedLockableContainer.prototype.tryUnlock = function(key) {
        if (_hasReachedMaxKeyMismatchCount.call(this)) {
            return this._ERRBACK(_MSG_MAX_COUNT_REACHED);
        }
        this._tryUnlock(key);
    };

    CountedLockableContainer.prototype.keyMismatchCount = function() {
        return this._keyMismatchCount;
    };

    CountedLockableContainer.prototype._initCaches = function() {
        Parent._initCaches.call(this);
        this._resetKeyMismatchCount();
    };

    CountedLockableContainer.prototype._tryUnlock = function(key) {
        if (!this._isCorrectKey(key)) _addKeyMismatchCount.call(this);
        Parent.tryUnlock.call(this, key);
        if (!_hasReachedMaxKeyMismatchCount.call(this)) return;
        this._ERRBACK(_MSG_MAX_COUNT_REACHED);
    };

    CountedLockableContainer.prototype._resetKeyMismatchCount = function() {
        this._keyMismatchCount = 0;
    };

    CountedLockableContainerUnitTest(CountedLockableContainer.prototype);

})(LockableContainer.prototype);
