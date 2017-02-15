function ResettableCountedLockableContainer() {
    this.initialize.apply(this, arguments);
};

(function(Parent) {

    'use strict';

    var _MSG_LOCKED = 'This container is locked';

    ResettableCountedLockableContainer.prototype = Object.create(Parent);
    ResettableCountedLockableContainer.prototype.constructor = 
            ResettableCountedLockableContainer;

    ResettableCountedLockableContainer.prototype.tryResetKeyMismatchCount
            = function(errback) {
        this.isLocked() ? errback(_MSG_LOCKED) : this._resetKeyMismatchCount();
    };

})(CountedLockableContainer.prototype);
