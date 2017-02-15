/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.locks.exceptions;

/**
 *
 * @author DoubleX
 */
public final class KeyMismatchException extends Exception {

    private static final long serialVersionUID = 1L;
    private static final String MESSAGE = "The passed key is incorrect!";

    public KeyMismatchException() {
        super(MESSAGE);
    }

    public KeyMismatchException(final Throwable cause) {
        super(MESSAGE, cause);
    }

    public KeyMismatchException(final String message) {
        super(message);
    }

    public KeyMismatchException(final String message, final Throwable cause) {
        super(message, cause);
    }

}
