/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks.lock;

import doublex.lib.locks.ICountable;
import doublex.lib.locks.ILockable;
import doublex.lib.locks.exceptions.KeyMismatchException;
import doublex.lib.locks.exceptions.MaxKeyMismatchCountReachedException;
import doublex.lib.locks.exceptions.ResetCountFailException;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class CountedLock<K> implements ICountable, ILockable<K> {

    private final ILockable<K> mLock;

    private int mKeyMismatchCount, mMaxKeyMismatchCount;

    public CountedLock(final int maxKeyMismatchCount, final ILockable<K> lock) {
        resetKeyMismatchCount();
        mMaxKeyMismatchCount = maxKeyMismatchCount;
        mLock = lock;
    }

    @Override
    public boolean isLocked() {
        return mLock.isLocked();
    }

    @Override
    public void lock() {
        mLock.lock();
    }

    @Override
    public void tryUnlock(final K key) throws KeyMismatchException {
        checkIsReachMaxKeyMismatchCount();
        try {
            mLock.tryUnlock(key);
        } catch (final KeyMismatchException keyMismatchException) {
            onUnlockFail(keyMismatchException);
        }
    }

    @Override
    public int count() {
        return mKeyMismatchCount;
    }

    @Override
    public void tryChangeMaxCount(final int maxCount) 
            throws ResetCountFailException {
        if (!isLocked()) {
            checkCanChangeMaxCount(maxCount);
            changeMaxKeyMismatchCount(maxCount);
        }
    }

    @Override
    public void tryResetCount() {
        if (!isLocked())  {
            resetKeyMismatchCount();
        }
    }

    private void onUnlockFail(final KeyMismatchException keyMismatchException) 
            throws KeyMismatchException {
        addKeyMismatchCount();
        checkIsReachMaxKeyMismatchCount(keyMismatchException);
        throw new KeyMismatchException(keyMismatchException);
    }

    private void checkIsReachMaxKeyMismatchCount() throws KeyMismatchException {
        if (isReachMaxKeyMismatchCount()) {
            throw new KeyMismatchException(
                    new MaxKeyMismatchCountReachedException());
        }
    }

    private void checkIsReachMaxKeyMismatchCount(final KeyMismatchException 
            keyMismatchException) throws KeyMismatchException {
        if (isReachMaxKeyMismatchCount()) {
            throw new KeyMismatchException(new 
                    MaxKeyMismatchCountReachedException(keyMismatchException));
        }
    }

    private boolean isReachMaxKeyMismatchCount() {
        return count() >= mMaxKeyMismatchCount;
    }

    private void addKeyMismatchCount() {
        mKeyMismatchCount++;
    }

    private void checkCanChangeMaxCount(final int maxCount) 
            throws ResetCountFailException {
        if (isExceedCurKeyMismatchCount(maxCount)) {
            throw new ResetCountFailException(
                    new MaxKeyMismatchCountReachedException());
        }
    }

    private boolean isExceedCurKeyMismatchCount(final int maxCount) {
        return maxCount > count();
    }

    private void changeMaxKeyMismatchCount(final int maxCount) {
        mMaxKeyMismatchCount = maxCount;
    }

    private void resetKeyMismatchCount() {
        mKeyMismatchCount = 0;
    }

}
