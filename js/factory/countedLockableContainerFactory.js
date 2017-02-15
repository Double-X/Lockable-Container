function CountedLockableContainerFactory(Parent) {

    'use strict';

    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';
    var _SUBCLASS_RESETTABLE_COUNTED_LOCKABLE_CONTAINER = 
            'ResettableCountedLockableContainer';
    var _SUBCLASS_RESETTING_COUNTED_LOCKABLE_CONTAINER = 
            'ResettingCountedLockableContainer';

    function _createdCountedLockableContainer() {
        var args = arguments[0];
        args[args.length] = CountedLockableContainer.prototype;
        return _directSubclassFactoryFunc.call(this, args[0])(args);
    };

    function _directSubclassFactoryFunc(containerType) {
        if (_isResettableCountedLockableContainer(containerType)) {
            return _CREATED_RESETTABLE_COUNTED_Lockable_Container_Factory;
        } else if (_isResettingCountedLockableContainer(containerType)) {
            return _CREATED_RESETTING_COUNTED_Lockable_Container_Factory;
        }
        return _countedLockableContainer.bind(this);
    };

    function _isResettableCountedLockableContainer(containerType) {
        return containerType === 
                _SUBCLASS_RESETTABLE_COUNTED_LOCKABLE_CONTAINER;
    };

    function _isResettingCountedLockableContainer(containerType) {
        return containerType === _SUBCLASS_RESETTING_COUNTED_LOCKABLE_CONTAINER;
    };

    function _countedLockableContainer() {
        var args = arguments[0];
        var countedLockableContainer = new CountedLockableContainer(
                args[1], args[2]);
        return {
            isLocked: countedLockableContainer.isLocked.bind(
                    countedLockableContainer),
            lock: countedLockableContainer.lock.bind(countedLockableContainer),
            tryPutContents: countedLockableContainer.tryPutContents.bind(
                    countedLockableContainer),
            tryTakeContents: countedLockableContainer.tryTakeContents.bind(
                    countedLockableContainer),
            tryUnlock: countedLockableContainer.tryUnlock.bind(
                    countedLockableContainer),
            keyMismatchCount: countedLockableContainer.keyMismatchCount.bind(
                    countedLockableContainer)
        };
    };

    function _addKeyMismatchCount() { this._keyMismatchCount++; };

    function _hasReachedMaxKeyMismatchCount() {
        return this.keyMismatchCount() >= this._MAX_KEY_MISMATCH_COUNT;
    };

    function CountedLockableContainer() {
        this.initialize.apply(this, arguments);
    };
    CountedLockableContainer.prototype = Object.create(Parent);
    CountedLockableContainer.prototype.constructor = CountedLockableContainer;

    CountedLockableContainer.prototype.initialize = 
            function(key, maxKeyMismatchCount) {
        Parent.initialize.call(this, key);
        this._MAX_KEY_MISMATCH_COUNT = maxKeyMismatchCount;
    };

    CountedLockableContainer.prototype.tryUnlock = function(key, errback) {
        if (_hasReachedMaxKeyMismatchCount.call(this)) {
            return errback(_MSG_MAX_COUNT_REACHED);
        }
        this._tryUnlock(key, errback);
    };

    CountedLockableContainer.prototype.keyMismatchCount = function() {
        return this._keyMismatchCount;
    };

    CountedLockableContainer.prototype._initCaches = function() {
        Parent._initCaches.call(this);
        this._resetKeyMismatchCount();
    };

    CountedLockableContainer.prototype._tryUnlock = function(key, errback) {
        if (!this._isCorrectKey(key)) _addKeyMismatchCount.call(this);
        Parent.tryUnlock.call(this, key, errback);
        if (!_hasReachedMaxKeyMismatchCount.call(this)) return;
        errback(_MSG_MAX_COUNT_REACHED);
    };

    CountedLockableContainer.prototype._resetKeyMismatchCount = function() {
        this._keyMismatchCount = 0;
    };

    var _CREATED_RESETTABLE_COUNTED_Lockable_Container_Factory = 
            ResettableCountedLockableContainerFactory(
            CountedLockableContainer.prototype);

    var _CREATED_RESETTING_COUNTED_Lockable_Container_Factory = 
            ResettingCountedLockableContainerFactory(
            CountedLockableContainer.prototype);

    CountedLockableContainerUnitTest(CountedLockableContainer.prototype);

    return _createdCountedLockableContainer.bind(this);

};
