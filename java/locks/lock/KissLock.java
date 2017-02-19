/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks.lock;

import doublex.lib.locks.exceptions.KeyMismatchException;
import doublex.lib.locks.exceptions.MaxKeyMismatchCountReachedException;
import doublex.lib.locks.exceptions.ResetCountFailException;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class KissLock<K> {

    private boolean mIsLocked = false;
    private int mKeyMismatchCount = 0, mMaxKeyMismatchCount;
    private K mKey;

    public KissLock(final int maxKeyMismatchCount, final K key) {
        mMaxKeyMismatchCount = maxKeyMismatchCount;
        mKey = key;
    }

    public int count() {
        return mKeyMismatchCount;
    }

    public boolean isLocked() {
        return mIsLocked;
    }

    public void lock() {
        mIsLocked = true;
    }

    public synchronized void tryChangeKey(final K oldKey, final K newKey) 
            throws KeyMismatchException {
        if (!isLocked()) {
            if (!mKey.equals(oldKey)) {
                throw new KeyMismatchException();
            }
            mKey = newKey;
        }
    }

    public void tryChangeMaxCount(final int maxCount) 
            throws ResetCountFailException {
        if (!isLocked()) {
            if (maxCount > count()) {
                throw new ResetCountFailException(
                        new MaxKeyMismatchCountReachedException());
            }
            mMaxKeyMismatchCount = maxCount;
        }
    }

    public void tryResetCount() {
        if (!isLocked())  {
            mKeyMismatchCount = 0;
        }
    }

    public synchronized void tryUnlock(final K key) throws KeyMismatchException {
        if (count() >= mMaxKeyMismatchCount) {
            throw new KeyMismatchException(
                    new MaxKeyMismatchCountReachedException());
        } else if (mKey.equals(key)) {
            mIsLocked = false;
        } else {
            mKeyMismatchCount++;
            if (count() >= mMaxKeyMismatchCount) {
                throw new KeyMismatchException(
                        new MaxKeyMismatchCountReachedException());
            }
            throw new KeyMismatchException();
        }
    }

}
