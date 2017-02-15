/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class CountedLock<K> implements ICountable, ILockable<K> {

    private final ILockable<K> mLock;

    private int mKeyMismatchCount;
    private int mMaxKeyMismatchCount;

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
    public void tryUnlock(final K key) {
        if (isReachMaxKeyMismatchCount()) {
            return;
        }
        mLock.tryUnlock(key);
        if (isLocked()) {
            addKeyMismatchCount();
        }
    }

    @Override
    public int count() {
        return mKeyMismatchCount;
    }

    @Override
    public void tryChangeMaxCount(final int maxCount) {
        if (canChangeMaxCount(maxCount)) {
            changeMaxKeyMismatchCount(maxCount);
        }
    }

    @Override
    public void tryResetCount() {
        if (!isLocked()) {
            resetKeyMismatchCount();
        }
    }

    private boolean isReachMaxKeyMismatchCount() {
        return count() >= mMaxKeyMismatchCount;
    }

    private void addKeyMismatchCount() {
        mKeyMismatchCount++;
    }

    private boolean canChangeMaxCount(final int maxCount) {
        return !isLocked() && isExceedCurKeyMismatchCount(maxCount);
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
