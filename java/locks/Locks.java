/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks;

import doublex.lib.locks.lock.NullLock;
import java.util.AbstractMap;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class Locks<K> implements ILocks<K> {

    private final ILockable<K> NULL_LOCK = new NullLock<>();

    private final AbstractMap<String, ILockable<K>> mLocks;

    public Locks(final AbstractMap<String, ILockable<K>> locks) {
        mLocks = locks;
    }

    @Override
    public boolean containsKey(final String key) {
        return mLocks.containsKey(key);
    }

    @Override
    public boolean isLocked() {
        return mLocks.values().stream().anyMatch((lock) -> (lock.isLocked()));
    }

    @Override
    public ILockable<K> lock(final String key) {
        return containsKey(key) ? mLocks.get(key) : NULL_LOCK;
    }

    @Override
    public void tryPutLock(final String key, final ILockable<K> lock) {
        if (canPutLock(key, lock)) {
            putLock(key, lock);
        }
    }

    @Override
    public ILockable<K> triedTakenLock(final String key) {
        return (canTakeLock(key)) ? takenLock(key) : NULL_LOCK;
    }

    private boolean canPutLock(final String key, final ILockable<K> lock) {
        return !containsKey(key) && !lock.isLocked();
    }

    private void putLock(final String key, final ILockable<K> lock) {
        mLocks.put(key, lock);
    }

    private boolean canTakeLock(final String key) {
        return containsKey(key) && !lock(key).isLocked();
    }

    private ILockable<K> takenLock(final String key) {
        final ILockable<K> lock = lock(key);
        mLocks.remove(key);
        return lock;
    }

}
