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
public class SyncMutableLock<K> implements IMutableLockable<K> {

    private final IMutableLockable<K> mMutableLock;

    public SyncMutableLock(final IMutableLockable<K> mutableLock) {
        mMutableLock = mutableLock;
    }

    @Override
    public synchronized void tryChangeKey(K oldKey, K newKey) {
        mMutableLock.tryChangeKey(oldKey, newKey);
    }

    @Override
    public boolean isLocked() {
        return mMutableLock.isLocked();
    }

    @Override
    public void lock() {
        mMutableLock.lock();
    }

    @Override
    public void tryUnlock(K key) {
        mMutableLock.tryUnlock(key);
    }

}
