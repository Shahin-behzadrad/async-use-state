import { useState, useEffect, useRef } from "react";

type SetStateCallback<T> = (newState: T) => void;
type SetState<T> = (
  newState: T | ((prev: T) => T),
  callback?: SetStateCallback<T>
) => void;

const asyncUseState = <T>(initialState: T): [T, SetState<T>] => {
  const [state, setState] = useState<T>(initialState);
  const callbackRef = useRef<SetStateCallback<T> | null>(null);

  useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(state);
      callbackRef.current = null;
    }
  }, [state]);

  const setAsyncState: SetState<T> = (newState, callback) => {
    setState((prevState) => {
      const updatedState =
        typeof newState === "function"
          ? (newState as (prev: T) => T)(prevState)
          : newState;
      if (callback) callbackRef.current = callback;
      return updatedState;
    });
  };

  return [state, setAsyncState];
};

export default asyncUseState;
