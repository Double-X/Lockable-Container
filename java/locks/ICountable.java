/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks;

import doublex.lib.locks.exceptions.ResetCountFailException;

/**
 *
 * @author DoubleX
 */
public interface ICountable {

    public int count();

    public void tryChangeMaxCount(final int maxCount) 
            throws ResetCountFailException;

    public void tryResetCount();

}
