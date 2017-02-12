/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks;

import java.util.AbstractMap;
import java.util.LinkedHashMap;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class Locks<K> {

    private final ILockable<K> NULL_LOCK = new NullLock<>();

    private final AbstractMap<String, ILockable<K>> mLocks = 
            new LinkedHashMap<>();

    public final ILockable<K> lock(final String key) {
        return mLocks.containsKey(key) ? mLocks.get(key) : NULL_LOCK;
    }

    public final boolean isLocked() {
        return mLocks.values().stream().anyMatch((lock) -> (lock.isLocked()));
    }

    public final void tryPutLock(final String key, final ILockable<K> lock) {
        if (canPutLock(key, lock)) putLock(key, lock);
    }

    public final ILockable<K> triedTakenLock(final String key) {
        return (canTakeLock(key)) ? takenLock(key) : NULL_LOCK;
    }

    private boolean canPutLock(final String key, final ILockable<K> lock) {
        return !mLocks.containsKey(key) && !lock.isLocked();
    }

    private void putLock(final String key, final ILockable<K> lock) {
        mLocks.put(key, lock);
    }

    private boolean canTakeLock(final String key) {
        return mLocks.containsKey(key) && !mLocks.get(key).isLocked();
    }

    private ILockable<K> takenLock(final String key) {
        final ILockable<K> lock = mLocks.get(key);
        mLocks.remove(key);
        return lock;
    }

}
