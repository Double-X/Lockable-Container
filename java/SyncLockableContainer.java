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
 * @param <K>
 */
public final class SyncLockableContainer<C, K> implements IContainable<C> {

    private final IContainable<C> mLockableContainer;

    public SyncLockableContainer(final IContainable<C> lockableContainer) {
        mLockableContainer = lockableContainer;
    }

    @Override
    public final synchronized void tryPutContents(final C contents) {
        mLockableContainer.tryPutContents(contents);
    }

    @Override
    public final synchronized C triedTakenContents() {
        return mLockableContainer.triedTakenContents();
    }
    
}
