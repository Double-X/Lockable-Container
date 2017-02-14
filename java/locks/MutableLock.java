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
public final class MutableLock<K> extends AbstractLock<K> implements 
        IMutableLockable<K> {

    private K mKey;

    public MutableLock(final K key) {
        changeKey(key);
    }

    @Override
    public void tryChangeKey(final K oldKey, final K newKey) {
        if (canChangeKey(oldKey)) {
            changeKey(newKey);
        }
    }

    @Override
    boolean isCorrectKey(final K key) {
        return mKey.equals(key);
    }

    private boolean canChangeKey(final K oldKey) {
        return !isLocked() && isCorrectKey(oldKey);
    }

    private void changeKey(final K key) {
        mKey = key;
    }

};
