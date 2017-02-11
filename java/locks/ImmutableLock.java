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
public final class ImmutableLock<K> extends AbstractLock<K> {

    private final K mKey;

    public ImmutableLock(final K key) {
        mKey = key;
    }

    @Override
    final boolean isCorrectKey(final K key) {
        return mKey.equals(key);
    }

};
