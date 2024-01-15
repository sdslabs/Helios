// useWindowFocus.js

import { useEffect } from 'react';

const useWindowFocus = (handleBlur: () => void) => {
  const onFocus = () => {
    console.log('Tab is in focus');
  };

  const onBlur = () => {
    console.log('Tab is blurred');
    handleBlur();
  };

  useEffect(() => {
    window.addEventListener('focus', onFocus);
    window.addEventListener('blur', onBlur);

    onFocus();

    return () => {
      window.removeEventListener('focus', onFocus);
      window.removeEventListener('blur', onBlur);
    };
  }, [handleBlur]);
};

export default useWindowFocus;
