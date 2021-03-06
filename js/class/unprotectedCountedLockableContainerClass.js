function UnprotectedCountedLockableContainerClass(
        lockableContainer, KEY, MAX_KEY_MISMATCH_COUNT) {

    'use strict';

    var _protected = CountedLockableContainerClass.call(
            lockableContainer, KEY, MAX_KEY_MISMATCH_COUNT);

    function editProtected(protectedProp) {
    	var originalProtected = _protected[protectedProp];
    	if (typeof originalProtected !== 'function') return;
    	_protected[protectedProp] = function() {
    		console.info('UnprotectedLockableContainerClass editProtected');
    		console.info('protectedProp: ' + protectedProp);
    		return originalProtected.apply(this, arguments);
    	};
    };

    Object.keys(_protected).forEach(editProtected);
    lockableContainer._protected = _protected;

};
