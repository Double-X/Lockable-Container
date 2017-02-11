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
            = function() {
        if (this.isLocked()) return this._ERRBACK(_MSG_LOCKED);
        this._resetKeyMismatchCount();
    };

})(CountedLockableContainer.prototype);
