function CountedLockableContainerObject() {

    'use strict';

    var _PARENT = arguments[0][arguments[0].length];
    var _MSG_MAX_COUNT_REACHED = 
            'The maximum amount of tolerable key mismatches are reached';
    var _SUBCLASS_RESETTABLE_COUNTED_LOCKABLE_CONTAINER = 
            'ResettableCountedLockableContainer';
    var _SUBCLASS_RESETTING_COUNTED_LOCKABLE_CONTAINER = 
            'ResettingCountedLockableContainer';

    function _directSubclassFactoryFunc(containerType) {
        if (_isResettableCountedLockableContainer(containerType)) {
            return ResettableCountedLockableContainerObject;
        } else if (_isResettingCountedLockableContainer(containerType)) {
            return ResettingCountedLockableContainerObject;
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
        _PARENT._init(args[1], args[2]);
        return {
            isLocked: _PARENT.isLocked.bind(_PARENT),
            lock: _PARENT.lock.bind(_PARENT),
            tryPutContents: _PARENT.tryPutContents.bind(_PARENT),
            tryTakeContents: _PARENT.tryTakeContents.bind(_PARENT),
            tryUnlock: _PARENT.tryUnlock.bind(_PARENT),
            keyMismatchCount: _PARENT.keyMismatchCount.bind(_PARENT)
        };
    };

    var MAX_KEY_MISMATCH_COUNT;

    var _keyMismatchCount = 0;

    function _hasReachedMaxKeyMismatchCount() {
        return _PARENT.keyMismatchCount() >= MAX_KEY_MISMATCH_COUNT;
    };

    function _tryUnlock(key, errback) {
        if (!_PARENT._isCorrectKey(key)) _addKeyMismatchCount.call(_PARENT);
        originalTryUnlock.call(_PARENT, key, errback);
        if (!_hasReachedMaxKeyMismatchCount.call(_PARENT)) return;
        errback(_MSG_MAX_COUNT_REACHED);
    };

    function _addKeyMismatchCount() { _keyMismatchCount++; };

    var _originalInit = _PARENT._init;
    _PARENT._init = function(key, maxKeyMismatchCount) {
        _originalInit.call(_PARENT, key);
        MAX_KEY_MISMATCH_COUNT = maxKeyMismatchCount;
    };

    var originalTryUnlock = _PARENT.tryUnlock;
    _PARENT.tryUnlock = function(key, errback) {
        if (_hasReachedMaxKeyMismatchCount.call(_PARENT)) {
            return errback(_MSG_MAX_COUNT_REACHED);
        }
        _tryUnlock(key, errback);
    };

    _PARENT.keyMismatchCount = function() { return _keyMismatchCount; };

    var _originalInitCaches = _PARENT._initCaches;
    _PARENT._initCaches = function() {
        _originalInitCaches.call(_PARENT);
        _PARENT._resetKeyMismatchCount();
    };

    _PARENT._resetKeyMismatchCount = function() { _keyMismatchCount = 0; };

    CountedLockableContainerUnitTest(_PARENT);

    return _directSubclassFactoryFunc(arguments[0][0])(arguments[0]);

};
