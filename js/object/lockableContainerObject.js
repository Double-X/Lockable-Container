function LockableContainerObject() {

    'use strict';

    var _MSG_HAS_CONTENTS = "This container already has contents";
    var _MSG_INCORRECT_KEY = "The key doesn't match the lock of this container";
    var _MSG_LOCKED = 'This container is locked';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};
    var _SUBCLASS_COUNTED_LOCKABLE_CONTAINER = [
        'CountedLockableContainer',
        'ResetableCountedLockableContainer',
        'ResettingCountedLockableContainer'
    ];

    function _directSubclassFactoryFunc(containerType) {
        if (_isCountedLockableContainer(containerType)) {
            return CountedLockableContainerObject;
        }
        return _lockableContainer.bind(this);
    };

    function _isCountedLockableContainer(containerType) {
        return _SUBCLASS_COUNTED_LOCKABLE_CONTAINER.indexOf(containerType) >= 0;
    };

    function _lockableContainer() {
        var args = arguments[0];
        this._init(args[1], args[2], args[3]);
        return {
            isLocked: this.isLocked.bind(this),
            lock: this.lock.bind(this),
            tryPutContents: this.tryPutContents.bind(this),
            tryTakeContents: this.tryTakeContents.bind(this),
            tryUnlock: this.tryUnlock.bind(this)
        };
    };

    var CALLBACK, KEY;

    var _contents = _NULL_CONTENTS, _isLocked = false;

    function _initReadonlys(callback, errback, key) {
        CALLBACK = callback;
        this._ERRBACK = errback;
        KEY = key;
    };

    function _hasNoContents() { return _contents === _NULL_CONTENTS; };

    function _putContents(contents) { _contents = contents; };

    function _takeContents() {
        CALLBACK(_contents);
        _clearContents.call(this);
    };

    function _clearContents() { _contents = _NULL_CONTENTS; };

    this._init = function(callback, errback, key) {
        _initReadonlys.call(this, callback, errback, key);
        this._initCaches();
    };

    this.isLocked = function() { return _isLocked; };

    this.lock = function() { _isLocked = true; };

    this.tryPutContents = function(contents) {
        if (this.isLocked()) return this._ERRBACK(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return _putContents.call(this, contents);
        this._ERRBACK(_MSG_HAS_CONTENTS);
    };

    this.tryTakeContents = function() {
        if (this.isLocked()) return this._ERRBACK(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return this._ERRBACK(_MSG_NO_CONTENTS);
        _takeContents.call(this);
    };

    this.tryUnlock = function(key) {
        if (this._isCorrectKey(key)) return this._unlock();
        this._ERRBACK(_MSG_INCORRECT_KEY);
    };

    this._initCaches = function() {
        _clearContents.call(this);
        this._unlock();
    };

    this._isCorrectKey = function(key) { return key === KEY; };

    this._unlock = function() { _isLocked = false; };

    LockableContainerUnitTest(this);

    arguments[arguments.length] = this;
    return _directSubclassFactoryFunc.call(this, arguments[0])(arguments);

};
