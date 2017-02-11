function ResettingCountedLockableContainer() {
    this.initialize.apply(this, arguments);
};

(function(Parent) {

    'use strict';

    ResettingCountedLockableContainer.prototype = Object.create(Parent);
    ResettingCountedLockableContainer.prototype.constructor = 
            ResettingCountedLockableContainer;

    ResettingCountedLockableContainer.prototype._unlock = function() {
        Parent._unlock.call(this);
        this._resetKeyMismatchCount();
    };

})(CountedLockableContainer.prototype);
