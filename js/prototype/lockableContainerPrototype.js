function LockableContainer() { this.initialize.apply(this, arguments); };

(function() {

    'use strict';

    var _MSG_HAS_CONTENTS = "This container already has contents";
    var _MSG_INCORRECT_KEY = 
            "The key doesn't match the lock of this container";
    var _MSG_LOCKED = 'This container is locked';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};

    function _initReadonlys(callback, errback, key) {
        this._CALLBACK = callback;
        this._ERRBACK = errback;
        this._KEY = key;
    };

    function _hasNoContents() { return this._contents === _NULL_CONTENTS; };

    function _putContents(contents) { this._contents = contents; };

    function _takeContents() {
        this._CALLBACK(this._contents);
        _clearContents.call(this);
    };

    function _clearContents() { this._contents = _NULL_CONTENTS; };

    LockableContainer.prototype = Object.create(Object.prototype);
    LockableContainer.prototype.constructor = LockableContainer;

    LockableContainer.prototype.initialize = function(callback, errback, key) {
        _initReadonlys.call(this, callback, errback, key);
        this._initCaches();
    };

    LockableContainer.prototype.isLocked = function() { return this._isLocked; };

    LockableContainer.prototype.lock = function() { this._isLocked = true; };

    LockableContainer.prototype.tryPutContents = function(contents) {
        if (this.isLocked()) return this._ERRBACK(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return _putContents.call(this, contents);
        this._ERRBACK(_MSG_HAS_CONTENTS);
    };

    LockableContainer.prototype.tryTakeContents = function() {
        if (this.isLocked()) return this._ERRBACK(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return this._ERRBACK(_MSG_NO_CONTENTS);
        _takeContents.call(this);
    };

    LockableContainer.prototype.tryUnlock = function(key) {
        if (this._isCorrectKey(key)) return this._unlock();
        this._ERRBACK(_MSG_INCORRECT_KEY);
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
