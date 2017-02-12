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
public final class UnitTestedLockableContainer<C, K> {

    private final LockableContainer<C, K> mLockableContainer;

    public UnitTestedLockableContainer(
            final LockableContainer<C, K> lockableContainer) {
        mLockableContainer = lockableContainer;
    }

    public final void tryPutContents(final C contents) {
        System.out.println(
                "UnitTestedLockableContainer tryPutContents contents: " + 
                        contents);
        mLockableContainer.tryPutContents(contents);
    }

    public final C triedTakenContents() {
        final C contents = mLockableContainer.triedTakenContents();
        System.out.println("UnitTestedLockableContainer triedTakenContents");
        if (mLockableContainer.mLocks.isLocked() && contents != null) {
            System.out.println("Failed! Actual value: " + contents);
        } else {
            System.out.println(
                    "At least nothing can be taken from a locked container!");
        }
        return contents;
    }

}
