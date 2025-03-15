import { useState, useEffect } from "react";

type SetStateCallback<T> = (newState: T) => void;

const asyncUseState = <T,>(
  initialState: T
): [T, (newState: T, callback?: SetStateCallback<T>) => void] => {
  const [state, setState] = useState<T>(initialState);
  const [callback, setCallback] = useState<SetStateCallback<T> | null>(null);

  useEffect(() => {
    if (callback) {
      callback(state);
      setCallback(null); // Reset callback after execution
    }
  }, [state, callback]);

  const setAsyncState = (newState: T, callbackFn?: SetStateCallback<T>) => {
    setState(newState);
    if (callbackFn) {
      setCallback(() => callbackFn);
    }
  };

  return [state, setAsyncState];
};

export default asyncUseState;
