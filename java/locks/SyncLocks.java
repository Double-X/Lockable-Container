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
public final class SyncLocks<K> {

    private final Locks<K> mLocks;

    public SyncLocks(final Locks<K> locks) {
        mLocks = locks;
    }

    public final ILockable<K> lock(final String key) {
        return mLocks.lock(key);
    }

    public final boolean isLocked() {
        return mLocks.isLocked();
    }

    public final synchronized void tryPutLock(
            final String key, final ILockable<K> lock) {
        mLocks.tryPutLock(key, lock);
    }

    public final synchronized ILockable<K> triedTakenLock(final String key) {
        return mLocks.triedTakenLock(key);
    }

}
