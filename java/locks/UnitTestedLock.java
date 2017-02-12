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
public class UnitTestedLock<K> implements ILockable<K> {

    private final ILockable<K> mLock;

    public UnitTestedLock(final ILockable<K> lock) {
        mLock = lock;
    }

    @Override
    public final boolean isLocked() {
        System.out.println(
                "UnitTestedLock isLocked isLocked: " + mLock.isLocked());
        return mLock.isLocked();
    }

    @Override
    public final void lock() {
        System.out.println("UnitTestedLock lock");
        mLock.lock();
        unitTestLock();
    }

    @Override
    public final void tryUnlock(final K key) {
        System.out.println("UnitTestedLock tryUnlock key: " + key);
        mLock.tryUnlock(key);
    }

    private void unitTestLock() {
        System.out.println("UnitTestedLock unitTestLock");
        System.out.println(mLock.isLocked() ? "Passed!" : "Failed!");
    }

}
