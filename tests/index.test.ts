import { renderHook, act } from "@testing-library/react";
import asyncUseState from "../src/index";

test("should update state and call callback", () => {
  const { result } = renderHook(() => asyncUseState(0));

  let callbackResult: number | null = null;
  act(() => {
    result.current[1](1, (newState) => {
      callbackResult = newState;
    });
  });

  expect(result.current[0]).toBe(1);
  expect(callbackResult).toBe(1);
});
