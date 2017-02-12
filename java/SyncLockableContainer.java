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
public final class SyncLockableContainer<C> implements IContainable<C> {

    private final IContainable<C> mContainable;

    public SyncLockableContainer(final IContainable<C> containable) {
        mContainable = containable;
    }

    @Override
    public final synchronized void tryPutContents(final C contents) {
        mContainable.tryPutContents(contents);
    }

    @Override
    public final synchronized C triedTakenContents() {
        return mContainable.triedTakenContents();
    }

}
