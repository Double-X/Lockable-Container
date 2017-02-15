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
public abstract class AbstractLock<K> implements ILockable<K> {

    private boolean mIsLocked = false;

    @Override
    public final boolean isLocked() {
        return mIsLocked;
    }

    @Override
    public final void lock() {
        mIsLocked = true;
    }

    @Override
    public final void tryUnlock(final K key) throws KeyMismatchException {
        if (isCorrectKey(key)) {
            unlock();
        } else {
            throw new KeyMismatchException();
        }
    }

    abstract boolean isCorrectKey(final K key);

    private void unlock() {
        mIsLocked = false;
    }

};
