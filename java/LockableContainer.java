/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.lockableContainers;

import doublex.lib.locks.ILocks;

/**
 *
 * @author DoubleX
 * @param <C>
 * @param <K>
 */
public final class LockableContainer<C, K> implements IContainable<C>  {

    public final ILocks<K> mLocks;
    private C mContents = null;

    public LockableContainer(final ILocks<K> locks) {
        mLocks = locks;
    };

    @Override
    public final void tryPutContents(final C contents) {
        if (canPutContents()) putContents(contents);
    }

    @Override
    public final C triedTakenContents() {
        return canTakeContents() ? takenContents() : null;
    }

    private boolean canPutContents() {
        return !mLocks.isLocked() && isEmpty();
    }

    private void putContents(final C contents) {
        mContents = contents;
    }

    private boolean canTakeContents() {
        return !mLocks.isLocked() && !isEmpty();
    }

    private boolean isEmpty() {
        return mContents == null;
    };

    private C takenContents() {
        final C contents = mContents;
        clearContents();
        return contents;
    }

    private void clearContents() {
        mContents = null;
    }

};
