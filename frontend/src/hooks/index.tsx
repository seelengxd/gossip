import React, { useEffect, useRef } from "react";

// https://stackoverflow.com/questions/53253940/make-react-useeffect-hook-not-run-on-initial-render
const useDidMountEffect = (func: Function, deps: any[]) => {
  const didMount = useRef(false);

  useEffect(() => {
    if (didMount.current) func();
    else didMount.current = true;
  }, deps);
};

export default useDidMountEffect;
