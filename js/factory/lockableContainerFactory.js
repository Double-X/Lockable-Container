function LockableContainerFactory() {

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

    function _createdLockableContainer() {
        arguments[arguments.length] = LockableContainer.prototype;
        return _directSubclassFactoryFunc.call(this, arguments[0])(arguments);
    };

    function _directSubclassFactoryFunc(containerType) {
        if (_isCountedLockableContainer(containerType)) {
            return _CREATED_COUNTED_Lockable_Container_Factory;
        }
        return _lockableContainer.bind(this);
    };

    function _isCountedLockableContainer(containerType) {
        return _SUBCLASS_COUNTED_LOCKABLE_CONTAINER.indexOf(containerType) >= 0;
    };

    function _lockableContainer() {
        var lockableContainer = new LockableContainer(arguments[0][1]);
        return {
            isLocked: lockableContainer.isLocked.bind(lockableContainer),
            lock: lockableContainer.lock.bind(lockableContainer),
            tryPutContents: 
                    lockableContainer.tryPutContents.bind(lockableContainer),
            tryTakeContents: 
                    lockableContainer.tryTakeContents.bind(lockableContainer),
            tryUnlock: lockableContainer.tryUnlock.bind(lockableContainer)
        };
    };

    function _initReadonlys(key) { this._KEY = key; };

    function _hasNoContents() { return this._contents === _NULL_CONTENTS; };

    function _putContents(contents) { this._contents = contents; };

    function _takeContents(callback) {
        callback(this._contents);
        _clearContents.call(this);
    };

    function _clearContents() { this._contents = _NULL_CONTENTS; };

    function LockableContainer() { this.initialize.apply(this, arguments); };
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

    var _CREATED_COUNTED_Lockable_Container_Factory = 
            CountedLockableContainerFactory(LockableContainer.prototype);

    return _createdLockableContainer.bind(this);

};
