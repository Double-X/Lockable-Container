function LockableContainerUnitTest(lockableContainer) {

    'use strict';

    var IS_RUN_TEST_PER_CODE_CALL = false;

    function unitTestLock() {
        console.info('LockableContainerUnitTest unitTestLock');
        console.info(this.isLocked() ? 'Passed!' : 'Failed!');
    };

    function _unitTestUnlock() {
        console.info('LockableContainerUnitTest _unitTestLock');
        console.info(this.isLocked() ? 'Failed!' : 'Passed!');
    };

    if (IS_RUN_TEST_PER_CODE_CALL) {

        var unitTestedLock = lockableContainer.lock;
        lockableContainer.lock = function() {
            unitTestedLock.call(this);
            unitTestLock.call(this);
        };

        var _unitTestedUnlock = lockableContainer._unlock;
        lockableContainer._unlock = function() {
            _unitTestedUnlock.call(this);
            _unitTestUnlock.call(this);
        };

    };

};
