# async-use-state

A React hook for managing state with async callbacks.

## Installation

```bash
npm install async-use-state
```

## usage

```jsx
import React from "react";
import asyncUseState from "async-use-state";

const App = () => {
  const [count, setCount] = asyncUseState(0);

  const increment = () => {
    setCount(count + 1, (updatedCount) => {
      console.log("State has been updated:", updatedCount);
      // Perform async actions here
    });
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
    </div>
  );
};

export default App;
```
