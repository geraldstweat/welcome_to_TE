import React, { Fragment, memo, useCallback, useState } from 'react';

// =======================
// Main Component
// =======================
const MainComponent = () => {
  const [count, setCount] = useState(0); // just to demonstrate re-renders

  // Memoize the function so its reference doesn't change
  const makeLog = useCallback(() => {
    console.log('hi from MainComponent');
  }, []);

  return (
    <Fragment>
      <ChildComponent makeLog={makeLog} />
      <div style={{ marginTop: '10px' }}>
        <button onClick={() => setCount(count + 1)}>
          Update MainComponent ({count})
        </button>
      </div>
    </Fragment>
  );
};

// =======================
// Child Component (memoized)
// =======================
const ChildComponent = memo(({ makeLog }) => {
  console.log('Rendering ChildComponent'); // debug to see memo in action
  return (
    <button onClick={makeLog}>say Hi from ChildComponent</button>
  );
});

export default MainComponent;
