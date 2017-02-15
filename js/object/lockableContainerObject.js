function LockableContainerObject() {

    'use strict';

    var _MSG_HAS_CONTENTS = "This container already has contents";
    var _MSG_INCORRECT_KEY = "The key doesn't match the lock of this container";
    var _MSG_LOCKED = 'This container is locked';
    var _MSG_NO_CONTENTS = "This container has no contents";
    var _NULL_CONTENTS = {};
    var _SUBCLASS_COUNTED_LOCKABLE_CONTAINER = [
        'CountedLockableContainer',
        'ResettableCountedLockableContainer',
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
        this._init(arguments[0][1]);
        return {
            isLocked: this.isLocked.bind(this),
            lock: this.lock.bind(this),
            tryPutContents: this.tryPutContents.bind(this),
            tryTakeContents: this.tryTakeContents.bind(this),
            tryUnlock: this.tryUnlock.bind(this)
        };
    };

    var KEY;

    var _contents = _NULL_CONTENTS, _isLocked = false;

    function _initReadonlys(key) { KEY = key; };

    function _hasNoContents() { return _contents === _NULL_CONTENTS; };

    function _putContents(contents) { _contents = contents; };

    function _takeContents(callback) {
        callback(_contents);
        _clearContents.call(this);
    };

    function _clearContents() { _contents = _NULL_CONTENTS; };

    this._init = function(key) {
        _initReadonlys.call(this, key);
        this._initCaches();
    };

    this.isLocked = function() { return _isLocked; };

    this.lock = function() { _isLocked = true; };

    this.tryPutContents = function(contents, errback) {
        if (this.isLocked()) return errback(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return _putContents.call(this, contents);
        errback(_MSG_HAS_CONTENTS);
    };

    this.tryTakeContents = function(callback, errback) {
        if (this.isLocked()) return errback(_MSG_LOCKED);
        if (_hasNoContents.call(this)) return errback(_MSG_NO_CONTENTS);
        _takeContents.call(this, callback);
    };

    this.tryUnlock = function(key, errback) {
        this._isCorrectKey(key) ? this._unlock() : errback(_MSG_INCORRECT_KEY);
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
