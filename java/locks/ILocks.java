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

    boolean containsKey(final String key);

    boolean isLocked();

    ILockable<K> lock(final String key);

    void tryPutLock(final String key, final ILockable<K> lock) ;

    ILockable<K> triedTakenLock(final String key);

}
