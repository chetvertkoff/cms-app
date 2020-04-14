import {useRef, useEffect } from 'react';

const usePrevState = (value)=>{
  const ref = useRef()
  useEffect(() => {
    ref.current = value
  });
  return ref.current
}

export default usePrevState

