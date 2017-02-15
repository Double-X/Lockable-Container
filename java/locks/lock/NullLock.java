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
public final class NullLock<K> implements ILockable<K> {

    @Override
    public final boolean isLocked() {
        return false;
    }

    @Override
    public final void lock() {
    }

    @Override
    public final void tryUnlock(final K key) {
    }

}
