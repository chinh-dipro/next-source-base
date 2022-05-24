import { useSelector, useDispatch } from "react-redux";
import { Button } from "@mui/material";

import { counterReducer, selectCounter } from "stores/reducers/counter";

function Counter() {
  const counter = useSelector(selectCounter());
  const dispatch = useDispatch();
  const increase = () => {
    dispatch(counterReducer.actions.increase());
  };

  return (
    <div className="flex mb-8">
      <Button
        type="button"
        onClick={increase}
        className="flex items-center p-10 bg-gray-100 border-gray-500 rounded-lg shadow-xs dark:bg-gray-800"
      >
        <div>
          <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">
            Counter
          </p>
          <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
            {counter.counter}
          </p>
        </div>
      </Button>
    </div>
  );
}

export default Counter;
