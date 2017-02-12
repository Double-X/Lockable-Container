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
public interface ILockable<K> {

    boolean isLocked();

    void lock();

    void tryUnlock(final K key);

};
