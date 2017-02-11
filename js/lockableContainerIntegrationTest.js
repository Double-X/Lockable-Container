function LockableContainerIntegrationTest() {

    'use strict';

    var _createdLockableContainerFactory = LockableContainerFactory();

    var _isCallback1Called = false, _isCallback2Called = false;
    var _isErrback1Called = false, _isErrback2Called = false;
    var _contents1 = { content: 'Content 1' };
    var _contents2 = { content: 'Content 2' };
    var _key1 = 'Key 1', _key2 = 'Key 2';
    var _lastContents1 = {}, _lastContents2 = {};
    // These numbers must be greater than 1 or the containers won't be unlocked
    var _maxKeyMismatchCount1 = 4, _maxKeyMismatchCount2 = 5;
    //

    function _callback1(contents) {
        console.info('LockableContainerIntegrationTest callback1 contents: ' + 
                JSON.stringify(contents));
        _contents1 = contents;
        _isCallback1Called = true;
    };

    function _callback2(contents) {
        console.info('LockableContainerIntegrationTest callback2 contents: ' + 
                JSON.stringify(contents));
        _contents2 = contents;
        _isCallback2Called = true;
    };

    function _errback1(message) {
        console.info('LockableContainerIntegrationTest errback1 message: ' + 
                message);
        _isErrback1Called = true;
    };

    function _errback2(message) {
        console.info('LockableContainerIntegrationTest errback2 message: ' + 
                message);
        _isErrback2Called = true;
    };

    console.info('LockableContainerIntegrationTest');

    var isCounted = true, isResettable = true, isResetting = false;

    // All performance tests are done in Google Chrome 56.0.2924.87 and i3-2330M
    console.info('Pre performance test');
    // Base: Roughly 7MB
    var memoryTest = [];
    for (var count = 0; count < 100000; count++) {

        /*

        // Total: Roughly 25MB for 100,000 times
        memoryTest.push(new LockableContainer(_callback1, _errback1, _key1));
        memoryTest.push(new LockableContainer(_callback2, _errback2, _key2));
        //
        // Total: Roughly 25MB for 100,000 times
        memoryTest.push(new ResettableCountedLockableContainer(
                _callback1, _errback1, _key1, _maxKeyMismatchCount1));
        memoryTest.push(new ResettableCountedLockableContainer(
                _callback2, _errback2, _key2, _maxKeyMismatchCount2));
        //
        // Total: Roughly 25MB for 100,000 times
        memoryTest.push(new ResettingCountedLockableContainer(
                _callback1, _errback1, _key1, _maxKeyMismatchCount1));
        memoryTest.push(new ResettingCountedLockableContainer(
                _callback2, _errback2, _key2, _maxKeyMismatchCount2));
        //

        // Total: Roughly 134MB for 100,000 times
        memoryTest.push(new LockableContainerClass(_callback1, _errback1, 
                _key1, _maxKeyMismatchCount1));
        memoryTest.push(new LockableContainerClass(_callback2, _errback2, 
                _key2, _maxKeyMismatchCount2));
        //
        // Total: Roughly 220MB for 100,000 times
        memoryTest.push(new ResettableCountedLockableContainerClass(_callback1, 
                _errback1, _key1, _maxKeyMismatchCount1));
        memoryTest.push(new ResettableCountedLockableContainerClass(_callback2, 
                _errback2, _key2, _maxKeyMismatchCount2));
        //
        // Total: Roughly 219MB for 100,000 times
        memoryTest.push(new ResettingCountedLockableContainerClass(_callback1, 
                _errback1, _key1, _maxKeyMismatchCount1));
        memoryTest.push(new ResettingCountedLockableContainerClass(_callback2, 
                _errback2, _key2, _maxKeyMismatchCount2));
        //

        // Total: Roughly 62MB for 100,000 times
        memoryTest.push(_createdLockableContainerFactory('LockableContainer', 
                _callback1, _errback1, _key1));
        memoryTest.push(_createdLockableContainerFactory('LockableContainer', 
                _callback2, _errback2, _key2));
        //
        // Total: Roughly 75MB for 100,000 times
        memoryTest.push(_createdLockableContainerFactory(
                'ResettableCountedLockableContainer', _callback1, _errback1, 
                _key1, _maxKeyMismatchCount1));
        memoryTest.push(_createdLockableContainerFactory(
                'ResettableCountedLockableContainer', _callback2, _errback2, 
                _key2, _maxKeyMismatchCount2));
        //
        // Total: Roughly 68MB for 100,000 times
        memoryTest.push(_createdLockableContainerFactory(
                'ResettingCountedLockableContainer', _callback1, _errback1, 
                _key1, _maxKeyMismatchCount1));
        memoryTest.push(_createdLockableContainerFactory(
                'ResettingCountedLockableContainer', _callback2, _errback2, 
                _key2, _maxKeyMismatchCount2));
        //

        // Total: Roughly 151MB for 100,000 times
        memoryTest.push(
                LockableContainerFunction(_callback1, _errback1, _key1));
        memoryTest.push(
                LockableContainerFunction(_callback2, _errback2, _key2));
        //
        // Total: Roughly 225MB for 100,000 times
        memoryTest.push(ResettableCountedLockableContainerFunction(
                LockableContainerFunction(_callback1, _errback1, _key1), 
                _errback1, _maxKeyMismatchCount1, true, false));
        memoryTest.push(ResettableCountedLockableContainerFunction(
                LockableContainerFunction(_callback2, _errback2, _key2), 
                _errback2, _maxKeyMismatchCount2, false, true));
        //

        // Total: Roughly 211MB for 100,000 times
        memoryTest.push(new LockableContainerObject('LockableContainer', 
                _callback1, _errback1, _key1));
        memoryTest.push(new LockableContainerObject('LockableContainer', 
                _callback2, _errback2, _key2));
        //
        // Total: Roughly 328MB for 100,000 times
        memoryTest.push(new LockableContainerObject(
                'ResettableCountedLockableContainer', _callback1, _errback1, 
                _key1, _maxKeyMismatchCount1));
        memoryTest.push(new LockableContainerObject(
                'ResettableCountedLockableContainer', _callback2, _errback2, 
                _key2, _maxKeyMismatchCount2));
        //
        // Total: Roughly 321MB for 100,000 times
        memoryTest.push(new LockableContainerObject(
                'ResettingCountedLockableContainer', _callback1, _errback1, 
                _key1, _maxKeyMismatchCount1));
        memoryTest.push(new LockableContainerObject(
                'ResettingCountedLockableContainer', _callback2, _errback2, 
                _key2, _maxKeyMismatchCount2));
        //

        */

        /*

        // Roughly 16 seconds for 100,000,000 times
        new LockableContainer(_callback1, _errback1, _key1);
        new LockableContainer(_callback2, _errback2, _key2);
        //
        // Roughly 19 seconds for 100,000,000 times
        new ResettableCountedLockableContainer(
                _callback1, _errback1, _key1, _maxKeyMismatchCount1);
        new ResettableCountedLockableContainer(
                _callback2, _errback2, _key2, _maxKeyMismatchCount2);
        //
        // Roughly 18 seconds for 100,000,000 times
        new ResettingCountedLockableContainer(
                _callback1, _errback1, _key1, _maxKeyMismatchCount1);
        new ResettingCountedLockableContainer(
                _callback2, _errback2, _key2, _maxKeyMismatchCount2);
        //

        // Roughly 71 seconds for 10,000,000 times
        new LockableContainerClass(_callback1, _errback1, _key1, 
                _maxKeyMismatchCount1);
        new LockableContainerClass(_callback2, _errback2, _key2, 
                _maxKeyMismatchCount2);
        //
        // Roughly 14 seconds for 1,000,000 times
        new ResettableCountedLockableContainerClass(_callback1, _errback1, 
                _key1, _maxKeyMismatchCount1);
        new ResettableCountedLockableContainerClass(_callback2, _errback2, 
                _key2, _maxKeyMismatchCount2);
        //
        // Roughly 13 seconds for 1,000,000 times
        new ResettingCountedLockableContainerClass(_callback1, _errback1, 
                _key1, _maxKeyMismatchCount1);
        new ResettingCountedLockableContainerClass(_callback2, _errback2, 
                _key2, _maxKeyMismatchCount2);
        //

        // Roughly 21 seconds for 10,000,000 times
        _createdLockableContainerFactory('LockableContainer', _callback1, 
                _errback1, _key1);
        _createdLockableContainerFactory('LockableContainer', _callback2, 
                _errback2, _key2);
        //
        // Roughly 23 seconds for 10,000,000 times
        _createdLockableContainerFactory('ResettableCountedLockableContainer', 
                _callback1, _errback1, _key1, _maxKeyMismatchCount1);
        _createdLockableContainerFactory('ResettableCountedLockableContainer', 
                _callback2, _errback2, _key2, _maxKeyMismatchCount2);
        //
        // Roughly 24 seconds for 10,000,000 times
        _createdLockableContainerFactory('ResettingCountedLockableContainer', 
                _callback1, _errback1, _key1, _maxKeyMismatchCount1);
        _createdLockableContainerFactory('ResettingCountedLockableContainer', 
                _callback2, _errback2, _key2, _maxKeyMismatchCount2);
        //

        // Roughly 49 seconds for 100,000,000 times
        LockableContainerFunction(_callback1, _errback1, _key1);
        LockableContainerFunction(_callback2, _errback2, _key2);
        //
        // Roughly 16 seconds for 1,000,000 times
        ResettableCountedLockableContainerFunction(LockableContainerFunction(
                _callback1, _errback1, _key1), _errback1, 
                _maxKeyMismatchCount1, isResettable, isResetting);
        ResettableCountedLockableContainerFunction(LockableContainerFunction(
                _callback2, _errback2, _key2), _errback2, 
                _maxKeyMismatchCount2, isResettable, isResetting);
        //

        // Roughly 16 seconds for 1,000,000 times
        new LockableContainerObject('LockableContainer', _callback1, _errback1, 
                _key1);
        new LockableContainerObject('LockableContainer', _callback2, _errback2, 
                _key2);
        //
        // Roughly 28 seconds for 1,000,000 times
        new LockableContainerObject('ResettableCountedLockableContainer', 
                _callback1, _errback1, _key1, _maxKeyMismatchCount1);
        new LockableContainerObject('ResettableCountedLockableContainer', 
                _callback2, _errback2, _key2, _maxKeyMismatchCount2);
        //
        // Roughly 30 seconds for 1,000,000 times
        new LockableContainerObject('ResettingCountedLockableContainer', 
                _callback1, _errback1, _key1, _maxKeyMismatchCount1);
        new LockableContainerObject('ResettingCountedLockableContainer', 
                _callback2, _errback2, _key2, _maxKeyMismatchCount2);
        //

        */

    };
    console.info('Post performance test');

    //return;

    console.info('Pre correctness test');

    var _lockableContainer1 = ResettableCountedLockableContainerFunction(
            LockableContainerFunction(_callback1, _errback1, _key1), _errback1, 
            _maxKeyMismatchCount1, isResettable, isResetting);
    var _lockableContainer2 = ResettableCountedLockableContainerFunction(
            LockableContainerFunction(_callback2, _errback2, _key2), _errback2, 
            _maxKeyMismatchCount2, isResettable, isResetting);
    /*
    var _lockableContainer1 = new ResettableCountedLockableContainerClass(
            _callback1, _errback1, _key1, _maxKeyMismatchCount1);
    var _lockableContainer2 = new ResettableCountedLockableContainerClass(
            _callback2, _errback2, _key2, _maxKeyMismatchCount2);
    var _lockableContainer1 = new ResettingCountedLockableContainerClass(
            _callback1, _errback1, _key1, _maxKeyMismatchCount1);
    var _lockableContainer2 = new ResettingCountedLockableContainerClass(
            _callback2, _errback2, _key2, _maxKeyMismatchCount2);
    UnprotectedCountedLockableContainerClass(_lockableContainer1, _callback1, 
            _errback1, _key1, _maxKeyMismatchCount1);
    UnprotectedCountedLockableContainerClass(_lockableContainer2, _callback2, 
            _errback2, _key2, _maxKeyMismatchCount2);
    console.info('_lockableContainer1._protected.isCorrectKey: ' + 
            _lockableContainer1._protected.isCorrectKey);
    console.info('_lockableContainer2._protected.isCorrectKey: ' + 
            _lockableContainer2._protected.isCorrectKey);
    console.info('_lockableContainer1._protected.keyMismatchCount: ' + 
            _lockableContainer1._protected.keyMismatchCount);
    console.info('_lockableContainer2._protected.keyMismatchCount: ' + 
            _lockableContainer2._protected.keyMismatchCount);
    var _lockableContainer1 = 
            new ResettableCountedLockableContainer(_callback1, _errback1, _key1);
    var _lockableContainer2 = 
            new ResettableCountedLockableContainer(_callback2, _errback2, _key2);
    var _lockableContainer1 = 
            new ResettingCountedLockableContainer(_callback1, _errback1, _key1);
    var _lockableContainer2 = 
            new ResettingCountedLockableContainer(_callback2, _errback2, _key2);
    var _lockableContainer1 = _createdLockableContainerFactory(
            'ResettableCountedLockableContainer', _callback1, _errback1, _key1, 
            _maxKeyMismatchCount1);
    var _lockableContainer2 = _createdLockableContainerFactory(
            'ResettableCountedLockableContainer', _callback2, _errback2, _key2, 
            _maxKeyMismatchCount2);
    var _lockableContainer1 = _createdLockableContainerFactory(
            'ResettingCountedLockableContainer', _callback1, _errback1, _key1, 
            _maxKeyMismatchCount1);
    var _lockableContainer2 = _createdLockableContainerFactory(
            'ResettingCountedLockableContainer', _callback2, _errback2, _key2, 
            _maxKeyMismatchCount2);
    var _lockableContainer1 = ResettableCountedLockableContainerFunction(
            LockableContainerFunction(_callback1, _errback1, _key1), _errback1, 
            _maxKeyMismatchCount1, isResettable, isResetting);
    var _lockableContainer2 = ResettableCountedLockableContainerFunction(
            LockableContainerFunction(_callback2, _errback2, _key2), _errback2, 
            _maxKeyMismatchCount2, isResettable, isResetting);
    var _lockableContainer1 = new LockableContainerObject(
            'ResettableCountedLockableContainer', _callback1, _errback1, _key1, 
            _maxKeyMismatchCount1);
    var _lockableContainer2 = new LockableContainerObject(
            'ResettableCountedLockableContainer', _callback2, _errback2, _key2, 
            _maxKeyMismatchCount2);
    var _lockableContainer1 = new LockableContainerObject(
            'ResettingCountedLockableContainer', _callback1, _errback1, _key1, 
            _maxKeyMismatchCount1);
    var _lockableContainer2 = new LockableContainerObject(
            'ResettingCountedLockableContainer', _callback2, _errback2, _key2, 
            _maxKeyMismatchCount2);
    */

    // Ensures each container's independent of each other and works correctly

    // Tests the initial container states
    if (_lockableContainer1.isLocked()) {
        console.info('Failed the 1st test!');
    } else {
        console.info('Passed the 1st test!');
    }
    if (_lockableContainer2.isLocked()) {
        console.info('Failed the 2nd test!');
    } else {
        console.info('Passed the 2nd test!');
    }
    //

    // Tests whether a container can lock itself

    _lockableContainer1.lock();
    if (_lockableContainer1.isLocked()) {
        console.info('Passed the 3rd test!');
    } else {
        console.info('Failed the 3rd test!');
    }
    if (_lockableContainer2.isLocked()) {
        console.info('Failed the 4th test!');
    } else {
        console.info('Passed the 4th test!');
    }

    _lockableContainer2.lock();
    if (_lockableContainer2.isLocked()) {
        console.info('Passed the 5th test!');
    } else {
        console.info('Failed the 5th test!');
    }

    //

    // Tests whether a container can block content accesses when it's locked

    _lockableContainer1.tryPutContents(_contents1);
    if (_isErrback1Called) {
        console.info('Passed the 6th test!');
    } else {
        console.info('Failed the 6th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 7th test!');
    } else {
        console.info('Passed the 7th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryPutContents(_contents2);
    if (_isErrback1Called) {
        console.info('Failed the 8th test!');
    } else {
        console.info('Passed the 8th test!');
    }
    if (_isErrback2Called) {
        console.info('Passed the 9th test!');
    } else {
        console.info('Failed the 9th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer1.tryTakeContents();
    if (_isCallback1Called) {
        console.info('Failed the 10th test!');
    } else {
        console.info('Passed the 10th test!');
    }
    if (_isCallback2Called) {
        console.info('Failed the 11th test!');
    } else {
        console.info('Passed the 11th test!');
    }
    if (_isErrback1Called) {
        console.info('Passed the 12th test!');
    } else {
        console.info('Failed the 12th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 13th test!');
    } else {
        console.info('Passed the 13th test!');
    }
    _isCallback1Called = false, _isCallback2Called = false;
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryTakeContents();
    if (_isCallback1Called) {
        console.info('Failed the 14th test!');
    } else {
        console.info('Passed the 14th test!');
    }
    if (_isCallback2Called) {
        console.info('Failed the 15th test!');
    } else {
        console.info('Passed the 15th test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 16th test!');
    } else {
        console.info('Passed the 16th test!');
    }
    if (_isErrback2Called) {
        console.info('Passed the 17th test!');
    } else {
        console.info('Failed the 17th test!');
    }
    _isCallback1Called = false, _isCallback2Called = false;
    _isErrback1Called = false, _isErrback2Called = false;

    //

    // Tests whether a container can be and only be unlocked by the correct key

    _lockableContainer1.tryUnlock(_key2);
    if (_lockableContainer1.isLocked()) {
        console.info('Passed the 18th test!');
    } else {
        console.info('Failed the 18th test!');
    }
    if (_lockableContainer2.isLocked()) {
        console.info('Passed the 19th test!');
    } else {
        console.info('Failed the 19th test!');
    }
    if (_isErrback1Called) {
        console.info('Passed the 20th test!');
    } else {
        console.info('Failed the 20th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 21st test!');
    } else {
        console.info('Passed the 21st test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryUnlock(_key1);
    if (_lockableContainer1.isLocked()) {
        console.info('Passed the 22nd test!');
    } else {
        console.info('Failed the 22nd test!');
    }
    if (_lockableContainer2.isLocked()) {
        console.info('Passed the 23rd test!');
    } else {
        console.info('Failed the 23rd test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 24th test!');
    } else {
        console.info('Passed the 24th test!');
    }
    if (_isErrback2Called) {
        console.info('Passed the 25th test!');
    } else {
        console.info('Failed the 25th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer1.tryUnlock(_key1);
    if (_lockableContainer1.isLocked()) {
        console.info('Failed the 26th test!');
    } else {
        console.info('Passed the 26th test!');
    }
    if (_lockableContainer2.isLocked()) {
        console.info('Passed the 27th test!');
    } else {
        console.info('Failed the 27th test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 28th test!');
    } else {
        console.info('Passed the 28th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 29th test!');
    } else {
        console.info('Passed the 29th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryUnlock(_key2);
    if (_lockableContainer1.isLocked()) {
        console.info('Failed the 30th test!');
    } else {
        console.info('Passed the 30th test!');
    }
    if (_lockableContainer2.isLocked()) {
        console.info('Failed the 31st test!');
    } else {
        console.info('Passed the 31st test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 32nd test!');
    } else {
        console.info('Passed the 32nd test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 33rd test!');
    } else {
        console.info('Passed the 33rd test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    //

    // Tests whether a container will refuse to return contents if it's none

    _lockableContainer1.tryTakeContents();
    if (_isCallback1Called) {
        console.info('Failed the 34th test!');
    } else {
        console.info('Passed the 34th test!');
    }
    if (_isCallback2Called) {
        console.info('Failed the 35th test!');
    } else {
        console.info('Passed the 35th test!');
    }
    if (_isErrback1Called) {
        console.info('Passed the 36th test!');
    } else {
        console.info('Failed the 36th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 37th test!');
    } else {
        console.info('Passed the 37th test!');
    }
    _isCallback1Called = false, _isCallback2Called = false;
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryTakeContents();
    if (_isCallback1Called) {
        console.info('Failed the 38th test!');
    } else {
        console.info('Passed the 38th test!');
    }
    if (_isCallback2Called) {
        console.info('Failed the 39th test!');
    } else {
        console.info('Passed the 39th test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 40th test!');
    } else {
        console.info('Passed the 40th test!');
    }
    if (_isErrback2Called) {
        console.info('Passed the 41st test!');
    } else {
        console.info('Failed the 41st test!');
    }
    _isCallback1Called = false, _isCallback2Called = false;
    _isErrback1Called = false, _isErrback2Called = false;

    //

    // Tests whether a container can store contents once it's unlocked

    _lockableContainer1.tryPutContents(_contents1);
    if (_isErrback1Called) {
        console.info('Failed the 42nd test!');
    } else {
        console.info('Passed the 42nd test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 43rd test!');
    } else {
        console.info('Passed the 43rd test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;
    _lastContents1 = _contents1, _contents1 = {};

    _lockableContainer2.tryPutContents(_contents2);
    if (_isErrback1Called) {
        console.info('Failed the 44th test!');
    } else {
        console.info('Passed the 44th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 45th test!');
    } else {
        console.info('Passed the 45th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;
    _lastContents2 = _contents2, _contents2 = {};

    //

    // Tests whether a container will refuse to store contents if it's full

    _lockableContainer1.tryPutContents(_lastContents1);
    if (_isErrback1Called) {
        console.info('Passed the 46th test!');
    } else {
        console.info('Failed the 46th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 47th test!');
    } else {
        console.info('Passed the 47th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryPutContents(_lastContents2);
    if (_isErrback1Called) {
        console.info('Failed the 48th test!');
    } else {
        console.info('Passed the 48th test!');
    }
    if (_isErrback2Called) {
        console.info('Passed the 49th test!');
    } else {
        console.info('Failed the 49th test!');
    }
    _isErrback1Called = false, _isErrback2Called = false;

    //

    // Tests whether a container will return the unmutated contents

    _lockableContainer1.tryTakeContents();
    if (_isCallback1Called) {
        console.info('Passed the 50th test!');
    } else {
        console.info('Failed the 50th test!');
    }
    if (_isCallback2Called) {
        console.info('Failed the 51st test!');
    } else {
        console.info('Passed the 51st test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 52nd test!');
    } else {
        console.info('Passed the 52nd test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 53rd test!');
    } else {
        console.info('Passed the 53rd test!');
    }
    if (_contents1 === _lastContents1) {
        console.info('Passed the 54th test!');
    } else {
        console.info('Failed the 54th test! Actual value: ' + JSON.stringify(_contents1));
    }
    _isCallback1Called = false, _isCallback2Called = false;
    _isErrback1Called = false, _isErrback2Called = false;

    _lockableContainer2.tryTakeContents();
    if (_isCallback1Called) {
        console.info('Failed the 55th test!');
    } else {
        console.info('Passed the 55th test!');
    }
    if (_isCallback2Called) {
        console.info('Passed the 56th test!');
    } else {
        console.info('Failed the 56th test!');
    }
    if (_isErrback1Called) {
        console.info('Failed the 57th test!');
    } else {
        console.info('Passed the 57th test!');
    }
    if (_isErrback2Called) {
        console.info('Failed the 58th test!');
    } else {
        console.info('Passed the 58th test!');
    }
    if (_contents2 === _lastContents2) {
        console.info('Passed the 59th test!');
    } else {
        console.info('Failed the 59th test! Actual value: ' + JSON.stringify(_contents2));
    }
    _isCallback1Called = false, _isCallback2Called = false;
    _isErrback1Called = false, _isErrback2Called = false;

    //

    //

    // Ensures the encapsulated container internals are indeed private

    if (_lockableContainer1._KEY === undefined) {
        console.info('Passed the 60th test!');
    } else {
        console.info('Failed the 60th test! Actual value: ' + 
                _lockableContainer1._KEY);
    }

    if (_lockableContainer2['_isLocked'] === undefined) {
        console.info('Passed the 61th test!');
    } else {
        console.info('Failed the 61th test! Actual value: ' + 
                _lockableContainer2['_isLocked']);
    }

    if (_lockableContainer1._hasNoContents === undefined) {
        console.info('Passed the 62nd test!');
    } else {
        console.info('Failed the 62nd test! Actual value: ' + 
                _lockableContainer1._hasNoContents);
    }

    try {
        _lockableContainer2.isLocked().caller._contents;
        console.info('Failed the 63rd test!');
    } catch (exception) {
        console.info('exception: ' + exception);
        console.info('Passed the 63rd test!');
    };

    _lockableContainer1.lock();
    var _lastKey1 = _lockableContainer1._KEY;
    _lockableContainer1._KEY = _key2;
    _lockableContainer1.tryUnlock(_key1);
    if (_lockableContainer1.isLocked()) {
        console.info('Failed the 64th test!');
    } else {
        console.info('Passed the 64th test!');
    }
    _lockableContainer1.lock();
    _lockableContainer1.tryUnlock(_key2);
    if (_lockableContainer1.isLocked()) {
        console.info('Passed the 65th test!');
    } else {
        console.info('Failed the 65th test!');
    }
    _lockableContainer1._KEY = _lastKey1;
    _lockableContainer1.lock();

    _lockableContainer2.lock();
    var _lastIsLocked2 = _lockableContainer2['_isLocked'];
    _lockableContainer2['_isLocked'] = false;
    if (_lockableContainer2.isLocked()) {
        console.info('Passed the 66th test!');
    } else {
        console.info('Failed the 66th test!');
    }
    _lockableContainer2['_isLocked'] = _lastIsLocked2;

    //

    // There's no point in using a resettable when it's already resetting
    if (isResetting) {

        _lockableContainer1.tryUnlock(_key1);
        _lockableContainer1.lock();
        for (var count = 0; count < _maxKeyMismatchCount1 - 1; count++) {
            _lockableContainer1.tryUnlock(_key2);
        }
        if (_lockableContainer1.keyMismatchCount() === 
                _maxKeyMismatchCount1 - 1) {
            console.info('Passed the 67th test!');
        } else {
            console.info('Failed the 67th test! Actual value: ' + 
                    _lockableContainer1.keyMismatchCount());
        }
        _lockableContainer1.tryUnlock(_key1);
        if (_lockableContainer1.keyMismatchCount() > 0) {
            console.info('Failed the 68th test! Actual value: ' + 
                    _lockableContainer1.keyMismatchCount());
        } else {
            console.info('Passed the 68th test!');
        }

        _lockableContainer2.tryUnlock(_key2);
        _lockableContainer2.lock();
        for (var count = 0; count < _maxKeyMismatchCount2 - 1; count++) {
            _lockableContainer2.tryUnlock(_key1);
        }
        if (_lockableContainer2.keyMismatchCount() === 
                _maxKeyMismatchCount2 - 1) {
            console.info('Passed the 69th test!');
        } else {
            console.info('Failed the 69th test! Actual value: ' + 
                    _lockableContainer1.keyMismatchCount());
        }
        _lockableContainer2.tryUnlock(_key2);
        if (_lockableContainer2.keyMismatchCount() > 0) {
            console.info('Failed the 70th test! Actual value: ' + 
                    _lockableContainer2.keyMismatchCount());
        } else {
            console.info('Passed the 70th test!');
        }

    } else if (isResettable) {

        _lockableContainer1.lock();
        _lockableContainer1.tryResetKeyMismatchCount();
        if (_isErrback1Called) {
            console.info('Passed the 67th test!');
        } else {
            console.info('Failed the 67th test!');
        }
        _isErrback1Called = false;

        _lockableContainer2.lock();
        _lockableContainer2.tryResetKeyMismatchCount();
        if (_isErrback2Called) {
            console.info('Passed the 68th test!');
        } else {
            console.info('Failed the 68th test!');
        }
        _isErrback2Called = false;

        _lockableContainer1.tryUnlock(_key1);
        _lockableContainer1.tryResetKeyMismatchCount();
        _lockableContainer1.lock();
        for (var count = 0; count < _maxKeyMismatchCount1 - 1; count++) {
            _lockableContainer1.tryUnlock(_key2);
        }
        if (_lockableContainer1.keyMismatchCount() === 
                _maxKeyMismatchCount1 - 1) {
            console.info('Passed the 69th test!');
        } else {
            console.info('Failed the 69th test! Actual value: ' + 
                    _lockableContainer1.keyMismatchCount());
        }
        _lockableContainer1.tryUnlock(_key1);
        _lockableContainer1.tryResetKeyMismatchCount();
        if (_lockableContainer1.keyMismatchCount() > 0) {
            console.info('Failed the 70th test! Actual value: ' + 
                    _lockableContainer1.keyMismatchCount());
        } else {
            console.info('Passed the 70th test!');
        }

        _lockableContainer2.tryUnlock(_key2);
        _lockableContainer2.tryResetKeyMismatchCount();
        _lockableContainer2.lock();
        for (var count = 0; count < _maxKeyMismatchCount2 - 1; count++) {
            _lockableContainer2.tryUnlock(_key1);
        }
        if (_lockableContainer2.keyMismatchCount() === 
                _maxKeyMismatchCount2 - 1) {
            console.info('Passed the 71st test!');
        } else {
            console.info('Failed the 71st test! Actual value: ' + 
                    _lockableContainer1.keyMismatchCount());
        }
        _lockableContainer2.tryUnlock(_key2);
        _lockableContainer2.tryResetKeyMismatchCount();
        if (_lockableContainer2.keyMismatchCount() > 0) {
            console.info('Failed the 72nd test! Actual value: ' + 
                    _lockableContainer2.keyMismatchCount());
        } else {
            console.info('Passed the 72nd test!');
        }

    }
    //

    // These must be the last tests as the containers will be permanently locked
    if (isCounted) {

        _lockableContainer1.lock();
        for (var count = 0; count < _maxKeyMismatchCount1; count++) {
            _lockableContainer1.tryUnlock(_key2);
        }
        _lockableContainer1.tryUnlock(_key1);
        if (_lockableContainer1.isLocked()) {
            console.info('Passed the second last test!');
        } else {
            console.info('Failed the second last test!');
        }

        _lockableContainer2.lock();
        for (var count = 0; count < _maxKeyMismatchCount2; count++) {
            _lockableContainer2.tryUnlock(_key1);
        }
        _lockableContainer2.tryUnlock(_key2);
        if (_lockableContainer2.isLocked()) {
            console.info('Passed the last test!');
        } else {
            console.info('Failed the last test!');
        }

    }
    //

    console.info('Post correctness test');

};
