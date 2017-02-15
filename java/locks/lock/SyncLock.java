/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks.lock;

import doublex.lib.locks.ILockable;
import doublex.lib.locks.exceptions.KeyMismatchException;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class SyncLock<K> implements ILockable<K> {

    private final ILockable<K> mLock;

    public SyncLock(final ILockable<K> lock) {
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
    public synchronized void tryUnlock(final K key) throws KeyMismatchException {
        mLock.tryUnlock(key);
    }

}
