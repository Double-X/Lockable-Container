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
public final class SyncCountedLock<K> implements ILockable<K> {

    private final CountedLock<K> mLock;

    public SyncCountedLock(final CountedLock<K> lock) {
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
    public synchronized void tryUnlock(K key) {
        mLock.tryUnlock(key);
    }

}
