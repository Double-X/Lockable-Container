function UnprotectedLockableContainerClass(
        lockableContainer, CALLBACK, ERRBACK, KEY) {

    'use strict';

    var _protected = LockableContainerClass.call(
            lockableContainer, CALLBACK, ERRBACK, KEY);

    function editProtected(protectedProp) {
    	var originalProtected = _protected[protectedProp];
    	if (!(originalProtected instanceof Function)) return;
    	_protected[protectedProp] = function() {
    		console.info('UnprotectedLockableContainerClass editProtected');
    		console.info('protectedProp: ' + protectedProp);
    		return originalProtected.apply(this, arguments);
    	};
    };

    Object.keys(_protected).forEach(editProtected);
    lockableContainer._protected = _protected;

};
