/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks.lock;

import doublex.lib.locks.IMutableLockable;
import doublex.lib.locks.exceptions.KeyMismatchException;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public final class MutableLock<K> extends AbstractLock<K> implements 
        IMutableLockable<K> {

    private K mKey;

    public MutableLock(final K key) {
        changeKey(key);
    }

    @Override
    public void tryChangeKey(final K oldKey, final K newKey) 
            throws KeyMismatchException {
        if (!isLocked()) {
            checkCanChangeKey(oldKey);
            changeKey(newKey);
        }
    }

    @Override
    boolean isCorrectKey(final K key) {
        return mKey.equals(key);
    }

    private void checkCanChangeKey(final K oldKey) throws KeyMismatchException {
        if (!isCorrectKey(oldKey)) {
            throw new KeyMismatchException();
        }
    }

    private void changeKey(final K key) {
        mKey = key;
    }

};
