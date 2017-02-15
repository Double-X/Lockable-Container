/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.lockableContainers;

import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DoubleX
 * @param <C>
 * @param <K>
 */
public final class UnitTestedLockableContainer<C, K> implements IContainable<C> {

    private static final Logger LOG = 
            Logger.getLogger(UnitTestedLockableContainer.class.getName());

    private final LockableContainer<C, K> mLockableContainer;

    public UnitTestedLockableContainer(
            final LockableContainer<C, K> lockableContainer) {
        mLockableContainer = lockableContainer;
    }

    @Override
    public void tryPutContents(final C contents) throws ContainerFullException {
        unitTestTryPutContents(contents);
        mLockableContainer.tryPutContents(contents);
    }

    @Override
    public C triedTakenContents() {
        final C contents = mLockableContainer.triedTakenContents();
        unitTestTriedTakenContents(contents);
        return contents;
    }

    private void unitTestTryPutContents(final C contents) {
        LOG.log(Level.INFO, "UnitTestedLockableContainer tryPutContents");
        LOG.log(Level.INFO, "contents: {0}", contents);
    }

    private void unitTestTriedTakenContents(final C contents) {
        LOG.log(Level.INFO, "UnitTestedLockableContainer triedTakenContents");
        LOG.log(Level.INFO, "contents: {0}", contents);
    }
}
