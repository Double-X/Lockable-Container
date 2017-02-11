function CountedLockableContainerUnitTest(countedLockableContainer) {

    'use strict';

    return;

    function _unitTestResetKeyMismatchCount() {
        console.info('CountedLockableContainerUnitTest _unitTestResetKeyMismatchCount');
        if (this.keyMismatchCount() <= 0) return console.info('Passed!');
        console.info('Failed! Actual value: ' + this.keyMismatchCount());
    };

    var _unitTestedResetKeyMismatchCount = 
            countedLockableContainer._resetKeyMismatchCount;
    countedLockableContainer._resetKeyMismatchCount = function() {
        _unitTestedResetKeyMismatchCount.call(this);
        _unitTestResetKeyMismatchCount.call(this);
    };

};
