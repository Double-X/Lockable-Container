function LockableContainerFunction(KEY) {

    'use strict';

    var _MSG_HAS_CONTENTS = "This container already has contents";
    var _MSG_INCORRECT_KEY = "The key doesn't match the lock of this container";
    var _MSG_LOCKED = 'This container is locked';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};

    var _contents = _NULL_CONTENTS, _isLocked = false;

    function isLocked() { return _isLocked; };

    function lock() { _isLocked = true; };

    function tryPutContents(contents, errback) {
        if (isLocked()) return errback(_MSG_LOCKED);
        _hasNoContents() ? _putContents(contents) : errback(_MSG_HAS_CONTENTS);
    };

    function tryTakeContents(callback, errback) {
        if (isLocked()) return errback(_MSG_LOCKED);
        _hasNoContents() ? errback(_MSG_NO_CONTENTS) : _takeContents(callback);
    };

    function tryUnlock(key, errback) {
        _isCorrectKey(key) ? _unlock() : errback(_MSG_INCORRECT_KEY);
    };

    function _hasNoContents() { return _contents === _NULL_CONTENTS; };

    function _putContents(contents) { _contents = contents; };

    function _takeContents(callback) {
        callback(_contents);
        _clearContents();
    };

    function _clearContents() { _contents = _NULL_CONTENTS; };

    function _isCorrectKey(key) { return key === KEY; };

    function _unlock() { _isLocked = false; };

    var IS_RUN_TEST_SUITE_PER_FUNCTION_CALL = false;
    var IS_RUN_TEST_PER_CODE_CALL = false;

    function unitTestLock() {
        console.info('LockableContainerFunction unitTestLock');
        console.info(isLocked() ? 'Passed!' : 'Failed!');
    };

    function _unitTestUnlock() {
        console.info('LockableContainerFunction _unitTestUnlock');
        console.info(isLocked() ? 'Failed!' : 'Passed!');
    };

    if (IS_RUN_TEST_SUITE_PER_FUNCTION_CALL) {
        if (isLocked()) {
            _unlock();
            _unitTestUnlock();
            lock();
            unitTestLock();
        } else {
            lock();
            unitTestLock();
            _unlock();
            _unitTestUnlock();
        }
    };

    if (IS_RUN_TEST_PER_CODE_CALL) {

        var unitTestedLock = lock;
        lock = function() {
            unitTestedLock();
            unitTestLock();
        };

        var _unitTestedUnlock = _unlock;
        _unlock = function() {
            _unitTestedUnlock();
            _unitTestUnlock();
        };

    };

    return {
        'isLocked': isLocked,
        'lock': lock,
        'tryPutContents': tryPutContents,
        'tryTakeContents': tryTakeContents,
        'tryUnlock': tryUnlock
    };

};
