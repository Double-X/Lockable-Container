function LockableContainerKiss(CALLBACK, ERRBACK, KEY, MAX_KEY_MISMATCH_COUNT, 
        IS_RESETTABLE, IS_RESETTING) {

    'use strict';

    var _MSG_INCORRECT_KEY = "The key doesn't match the lock of this container";
    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};

    var _contents = _NULL_CONTENTS, _isLocked = false, _keyMismatchCount = 0;

    function isLocked() { return _isLocked; };

    function keyMismatchCount() { return _keyMismatchCount; };

    function tryPutContents(contents) {
        if (isLocked()) return ERRBACK('This container is locked');
        if (_contents === _NULL_CONTENTS) return _contents = contents;
        ERRBACK("This container already has contents");
    };

    function tryTakeContents() {
        if (isLocked()) return ERRBACK('This container is locked');
        if (_contents === _NULL_CONTENTS) return ERRBACK(_MSG_NO_CONTENTS);
        CALLBACK(_contents);
        _contents = _NULL_CONTENTS;
    };

    function tryUnlock(key) {
    	if (keyMismatchCount() >= MAX_KEY_MISMATCH_COUNT) {
    		return ERRBACK(_MSG_MAX_COUNT_REACHED);
    	}
        key === KEY ? _isLocked = false : ERRBACK(_MSG_INCORRECT_KEY);
        if (IS_RESETTING && !isLocked()) return _keyMismatchCount = 0;
        if (!isLocked()) return;
        _keyMismatchCount++;
        if (keyMismatchCount() < MAX_KEY_MISMATCH_COUNT) return;
        ERRBACK(_MSG_MAX_COUNT_REACHED);
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

        function tryResetKeyMismatchCount() {
            if (isLocked()) return ERRBACK('This container is locked');
            _keyMismatchCount = 0;
        };

        API['tryResetKeyMismatchCount'] = tryResetKeyMismatchCount;
    }

    return API;

};
