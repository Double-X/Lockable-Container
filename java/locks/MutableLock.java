/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks;

/**
 *
 * @author kenneth.lau
 * @param <K>
 */
public final class MutableLock<K> extends AbstractLock<K> implements 
        IMutableLockable<K> {

    private K mKey;

    public MutableLock(final K key) {
        changeKey(key);
    }

    @Override
    public final void tryChangeKey(final K oldKey, final K newKey) {
        if (isLocked()) return;
        if (isCorrectKey(oldKey)) changeKey(newKey);
    }

    @Override
    final boolean isCorrectKey(final K key) {
        return mKey.equals(key);
    }

    private void changeKey(final K key) {
        mKey = key;
    }

};
