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
public final class SyncLocks<K> implements ILocks<K> {

    private final Locks<K> mLocks;

    public SyncLocks(final Locks<K> locks) {
        mLocks = locks;
    }

    @Override
    public boolean containsKey(final String key) {
        return mLocks.containsKey(key);
    }

    @Override
    public boolean isLocked() {
        return mLocks.isLocked();
    }

    @Override
    public ILockable<K> lock(final String key) {
        return mLocks.lock(key);
    }

    @Override
    public synchronized void tryPutLock(
            final String key, final ILockable<K> lock) {
        mLocks.tryPutLock(key, lock);
    }

    @Override
    public synchronized ILockable<K> triedTakenLock(final String key) {
        return mLocks.triedTakenLock(key);
    }

}
