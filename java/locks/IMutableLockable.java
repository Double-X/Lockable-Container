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
public interface IMutableLockable<K> extends ILockable<K> {

    void tryChangeKey(final K oldKey, final K newKey);

};
