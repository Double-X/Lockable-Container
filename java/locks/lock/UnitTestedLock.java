/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks.lock;

import doublex.lib.locks.ILockable;
import doublex.lib.locks.exceptions.KeyMismatchException;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author DoubleX
 * @param <K>
 */
public class UnitTestedLock<K> implements ILockable<K> {

    private static final Logger LOG = 
            Logger.getLogger(UnitTestedLock.class.getName());

    private final ILockable<K> mLock;

    public UnitTestedLock(final ILockable<K> lock) {
        mLock = lock;
    }

    @Override
    public final boolean isLocked() {
        unitTestIsLocked();
        return mLock.isLocked();
    }

    @Override
    public final void lock() {
        mLock.lock();
        unitTestLock();
    }

    @Override
    public final void tryUnlock(final K key) throws KeyMismatchException {
        unitTestTryUnlock(key);
        mLock.tryUnlock(key);
    }

    private void unitTestIsLocked() {
        LOG.log(Level.INFO, "UnitTestedLock isLocked");
        LOG.log(Level.INFO, "isLocked: {0}", mLock.isLocked());
    }

    private void unitTestLock() {
        LOG.log(Level.INFO, "UnitTestedLock unitTestLock");
        LOG.log(Level.INFO, mLock.isLocked() ? "Passed!" : "Failed!");
    }

    private void unitTestTryUnlock(final K key) {
        LOG.log(Level.INFO, "UnitTestedLock tryUnlock key: {0}", key);
    }

}
