/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks;

/**
 *
 * @author kenneth.lau
 * @param <K>
 */
public final class CountedLock<K> implements ICountable, ILockable<K> {

    private final int mMaxKeyMismatchCount;
    private final ILockable<K> mLock;

    private int mKeyMismatchCount = 0;

    public CountedLock(final int maxKeyMismatchCount, final ILockable<K> lock) {
        mMaxKeyMismatchCount = maxKeyMismatchCount;
        mLock = lock;
    }

    @Override
    public final boolean isLocked() {
        return mLock.isLocked();
    }

    @Override
    public final void lock() {
        mLock.lock();
    }

    @Override
    public final void tryUnlock(final K key) {
        if (isMaxKeyMismatchCountReached()) return;
        mLock.tryUnlock(key);
        if (isLocked()) addKeyMismatchCount();
    }

    @Override
    public final void tryResetCount() {
        if (!isLocked()) resetKeyMismatchCount();
    }

    @Override
    public final int count() {
        return mKeyMismatchCount;
    }

    private boolean isMaxKeyMismatchCountReached() {
        return count() >= mMaxKeyMismatchCount;
    }

    private void addKeyMismatchCount() {
        mKeyMismatchCount++;
    }

    private void resetKeyMismatchCount() {
        mKeyMismatchCount = 0;
    }

}
