import { useEffect } from 'react';

/**
 * Hook that alerts clicks outside of the passed ref
 */
export default function useOutsideClick(ref: any, action: () => void) {
  useEffect(
    () => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: Event) {
        if (ref.current && !ref.current.contains(event.target)) {
          action();
        }
      }
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    },
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [ref],
  );
}
