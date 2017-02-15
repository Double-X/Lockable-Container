function LockableContainerClass(KEY) {

    'use strict';

    var _MSG_HAS_CONTENTS = "This container already has contents";
    var _MSG_INCORRECT_KEY = "The key doesn't match the lock of this container";
    var _MSG_LOCKED = 'This container is locked';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};

    var _contents = _NULL_CONTENTS, _isLocked = false;
    var _protected = {
        isCorrectKey: function(key) { return key === KEY; },
        unlock: function() { _isLocked = false; }
    };

    function _hasNoContents() { return _contents === _NULL_CONTENTS; };

    function _putContents(contents) { _contents = contents; };

    function _takeContents(callback) {
        callback(_contents);
        _clearContents();
    };

    function _clearContents() { _contents = _NULL_CONTENTS; };

    this.isLocked = function() { return _isLocked; };

    this.lock = function() { _isLocked = true; };

    this.tryPutContents = function(contents, errback) {
        if (this.isLocked()) return errback(_MSG_LOCKED);
        if (_hasNoContents()) return _putContents(contents);
        errback(_MSG_HAS_CONTENTS);
    };

    this.tryTakeContents = function(callback, errback) {
        if (this.isLocked()) return errback(_MSG_LOCKED);
        _hasNoContents() ? errback(_MSG_NO_CONTENTS) : _takeContents(callback);
    };

    this.tryUnlock = function(key, errback) {
        if (_protected.isCorrectKey(key)) return _protected.unlock();
        errback(_MSG_INCORRECT_KEY);
    };

    LockableContainerUnitTest(this);

    return _protected;

};
