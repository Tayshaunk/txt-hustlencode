import { Notification, toaster } from 'rsuite';

/**
 * Opens a toast with the message content and status type.
 * After the duration the toast will disappear
 * @param type Type of toast to display
 * @param duration Duration that toast remains visible
 * @param placement Placement of the toast
 * @param message Content of the toast
 * @param header Toast title - If not provided, header defaults to an empty string
 */
export const openToaster = (
  type: 'info' | 'success' | 'warning' | 'error',
  duration: number,
  placement: 'topStart' | 'topCenter' | 'topEnd' | 'bottomStart' | 'bottomCenter' | 'bottomEnd',
  message: string,
  header?: string | undefined,
) => {
  toaster.push(
    <Notification type={type} header={header ? header : ''} duration={duration} closable>
      <p>{message}</p>
    </Notification>,
    { placement: placement },
  );
};

/**
 * Opens a success toast with a custom message.
 * After the duration the toast will disappear
 * @param message the message to display within the toast
 * @param duration time for toast to remain visible
 */
export const openSuccessToaster = (message: string, duration: number) => {
  toaster.push(
    <Notification type="success" header="Success" duration={duration} closable>
      <p>{message}</p>
    </Notification>,
    { placement: 'topEnd' },
  );
};

/**
 * Opens a error toast with a custom message
 * After the duration the toast will disappear
 * @param message the message to display within the toast
 * @param duration time for toast to remain visible
 */
export const openErrorToaster = (message: string, duration: number) => {
  toaster.push(
    <Notification type="error" header="Error" duration={duration} closable>
      <p>{message}</p>
    </Notification>,
    { placement: 'topEnd' },
  );
};

/**
 * Opens a info toast with a custom message.
 * After the duration the toast will disappear
 * @param message the message to display within the toast
 * @param duration time for toast to remain visible
 */
export const openInfoToaster = (message: string, duration: number) => {
  toaster.push(
    <Notification type="info" header="Info" duration={duration} closable>
      <p>{message}</p>
    </Notification>,
    { placement: 'topEnd' },
  );
};
