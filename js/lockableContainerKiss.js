function LockableContainerKiss(KEY, MAX_KEY_MISMATCH_COUNT, IS_RESETTABLE, 
        IS_RESETTING) {

    'use strict';

    var _MSG_INCORRECT_KEY = "The key doesn't match the lock of this container";
    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};

    var _contents = _NULL_CONTENTS, _isLocked = false, _keyMismatchCount = 0;

    function isLocked() { return _isLocked; };

    function keyMismatchCount() { return _keyMismatchCount; };

    function tryPutContents(contents, errback) {
        if (isLocked()) return errback('This container is locked');
        if (_contents === _NULL_CONTENTS) return _contents = contents;
        errback("This container already has contents");
    };

    function tryTakeContents(callback, errback) {
        if (isLocked()) return errback('This container is locked');
        if (_contents === _NULL_CONTENTS) return errback(_MSG_NO_CONTENTS);
        callback(_contents);
        _contents = _NULL_CONTENTS;
    };

    function tryUnlock(key, errback) {
    	if (keyMismatchCount() >= MAX_KEY_MISMATCH_COUNT) {
    	    return errback(_MSG_MAX_COUNT_REACHED);
    	}
        key === KEY ? _isLocked = false : errback(_MSG_INCORRECT_KEY);
        if (IS_RESETTING && !isLocked()) return _keyMismatchCount = 0;
        if (!isLocked()) return;
        _keyMismatchCount++;
        if (keyMismatchCount() < MAX_KEY_MISMATCH_COUNT) return;
        errback(_MSG_MAX_COUNT_REACHED);
    };

    var API = {
        'isLocked': isLocked,
        'keyMismatchCount': keyMismatchCount,
        'lock': function() { _isLocked = true; },
        'tryPutContents': tryPutContents,
        'tryTakeContents': tryTakeContents,
        'tryUnlock': tryUnlock
    };

    if (IS_RESETTABLE) {

        function tryResetKeyMismatchCount(errback) {
            if (isLocked()) return errback('This container is locked');
            _keyMismatchCount = 0;
        };

        API['tryResetKeyMismatchCount'] = tryResetKeyMismatchCount;
    }

    return API;

};
