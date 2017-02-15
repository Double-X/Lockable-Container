function LockableContainer() { this.initialize.apply(this, arguments); };

(function() {

    'use strict';

    var _MSG_HAS_CONTENTS = "This container already has contents";
    var _MSG_INCORRECT_KEY = 
            "The key doesn't match the lock of this container";
    var _MSG_LOCKED = 'This container is locked';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};

    function _initReadonlys(key) { this._KEY = key; };

    function _hasNoContents() { return this._contents === _NULL_CONTENTS; };

    function _putContents(contents) { this._contents = contents; };

    function _takeContents(callback) {
        callback(this._contents);
        _clearContents.call(this);
    };

    function _clearContents() { this._contents = _NULL_CONTENTS; };

    LockableContainer.prototype = Object.create(Object.prototype);
    LockableContainer.prototype.constructor = LockableContainer;

    LockableContainer.prototype.initialize = function(key) {
        _initReadonlys.call(this, key);
        this._initCaches();
    };

    LockableContainer.prototype.isLocked = function() { return this._isLocked; };

    LockableContainer.prototype.lock = function() { this._isLocked = true; };

    LockableContainer.prototype.tryPutContents = function(contents, errback) {
        if (this.isLocked()) return errback(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return _putContents.call(this, contents);
        errback(_MSG_HAS_CONTENTS);
    };

    LockableContainer.prototype.tryTakeContents = function(callback, errback) {
        if (this.isLocked()) return errback(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return errback(_MSG_NO_CONTENTS);
        _takeContents.call(this, callback);
    };

    LockableContainer.prototype.tryUnlock = function(key, errback) {
        this._isCorrectKey(key) ? this._unlock() : errback(_MSG_INCORRECT_KEY);
    };

    LockableContainer.prototype._initCaches = function() {
        _clearContents.call(this);
        this._unlock();
    };

    LockableContainer.prototype._isCorrectKey = function(key) {
        return key === this._KEY;
    };

    LockableContainer.prototype._unlock = function() { this._isLocked = false; };

    LockableContainerUnitTest(LockableContainer.prototype);

})();
