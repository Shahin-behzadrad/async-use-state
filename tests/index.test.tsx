import { renderHook, act } from "@testing-library/react-hooks";
import asyncUseState from "../src/index";

test("should update state and call callback", () => {
  const { result } = renderHook(() => asyncUseState(0));

  let callbackResult: number | null = null;
  act(() => {
    result.current[1](1, (newState) => {
      callbackResult = newState;
    });
  });

  expect(result.current[0]).toBe(1); // State is updated
  expect(callbackResult).toBe(1); // Callback is called with the new state
});

test("should not call callback if not provided", () => {
  const { result } = renderHook(() => asyncUseState(0));

  act(() => {
    result.current[1](1);
  });

  expect(result.current[0]).toBe(1); // State is updated
});
