/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.lockableContainers;

/**
 *
 * @author DoubleX
 * @param <C>
 */
public interface IContainable<C> {

    void tryPutContents(final C contents) throws ContainerFullException;

    C triedTakenContents();

};
