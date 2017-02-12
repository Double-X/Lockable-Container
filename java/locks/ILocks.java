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
public interface ILocks<K> {

    ILockable<K> lock(final String key);

    boolean isLocked();

    void tryPutLock(final String key, final ILockable<K> lock);

    ILockable<K> triedTakenLock(final String key);

}
