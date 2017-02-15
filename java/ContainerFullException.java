/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package doublex.lib.lockableContainers;

/**
 *
 * @author DoubleX
 */
public final class ContainerFullException extends Exception {

    private static final long serialVersionUID = 1L;
    private static final String MESSAGE = "The container's full!";

    public ContainerFullException() {
        super(MESSAGE);
    }

    public ContainerFullException(final Throwable cause) {
        super(MESSAGE, cause);
    }

    public ContainerFullException(final String message) {
        super(message);
    }

    public ContainerFullException(final String message, final Throwable cause) {
        super(message, cause);
    }

}
