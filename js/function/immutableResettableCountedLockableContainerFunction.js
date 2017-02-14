function ImmutableResettableCountedLockableContainerFunction(LockableContainer, 
        ERRBACK, MAX_KEY_MISMATCH_COUNT, IS_RESETTABLE, IS_RESETTING) {

    'use strict';

    var _MSG_LOCKED = 'This container is locked';
    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';

    var _keyMismatchCount = 0;

    function isLocked() { return LockableContainer.isLocked(); };

    function lock() { LockableContainer.lock(); };

    function tryPutContents(contents) {
        LockableContainer.tryPutContents(contents);
    };

    function tryTakeContents() { LockableContainer.tryTakeContents(); };

    function tryUnlock(key) {
        if (!_hasReachedMaxKeyMismatchCount()) return _tryUnlock(key);
        ERRBACK(_MSG_MAX_COUNT_REACHED);
    };

    function keyMismatchCount() { return _keyMismatchCount; };

    function _tryUnlock(key) {
        LockableContainer.tryUnlock(key);
        if (_isResettingKeyMismatchCount()) return _resetKeyMismatchCount();
        if (isLocked()) _onAddKeyMismatchCount();
    };

    function _onAddKeyMismatchCount() {
        _addKeyMismatchCount();
        if (_hasReachedMaxKeyMismatchCount()) ERRBACK(_MSG_MAX_COUNT_REACHED);
    }

    function _addKeyMismatchCount() { _keyMismatchCount++; };

    function _hasReachedMaxKeyMismatchCount() {
        return keyMismatchCount() >= MAX_KEY_MISMATCH_COUNT;
    };

    function _isResettingKeyMismatchCount() {
        return IS_RESETTING && !isLocked();
    };

    function _resetKeyMismatchCount() { _keyMismatchCount = 0; };

    var API = {
        'isLocked': isLocked,
        'lock': lock,
        'tryPutContents': tryPutContents,
        'tryTakeContents': tryTakeContents,
        'tryUnlock': tryUnlock,
        'keyMismatchCount': keyMismatchCount
    };

    if (IS_RESETTABLE) {

        function tryResetKeyMismatchCount() {
            if (isLocked()) return ERRBACK(_MSG_LOCKED);
            _resetKeyMismatchCount();
        };

        API['tryResetKeyMismatchCount'] = tryResetKeyMismatchCount;

    }

    var IS_RUN_TEST_PER_CODE_CALL = false;

    if (IS_RUN_TEST_PER_CODE_CALL) {

        function _unitTestResetKeyMismatchCount() {
            console.info('ResettableCountedLockableContainerFunction _unitTestResetKeyMismatchCount');
            if (keyMismatchCount() <= 0) return console.info('Passed!');
            console.info('Failed! Actual value: ' + keyMismatchCount());
        };

        var _unitTestedResetKeyMismatchCount = _resetKeyMismatchCount;
        _resetKeyMismatchCount = function() {
            _unitTestedResetKeyMismatchCount();
            _unitTestResetKeyMismatchCount();
        };

    };

    return API;

};
