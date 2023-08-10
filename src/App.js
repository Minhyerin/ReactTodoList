import logo from "./logo.svg";
import "./App.css";
import Header from "./Components/Header";
import TodoEditor from "./Components/TodoEditor";
import TodoList from "./Components/TodoList";
import { useState, useRef, useReducer, useEffect } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "INIT": {
      return action.data;
    }
    case "CREATE": {
      const newState = [action.newItem, ...state];
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    case "UPDATE": {
      const newState = state.map((item) =>
        item.id === action.targetId ? { ...item, isDone: !item.isDone } : item
      );
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    case "DELETE": {
      const newState = state.filter((item) => item.id !== action.targetId);
      localStorage.setItem("todo", JSON.stringify(newState));
      return newState;
    }
    default:
      return state;
  }
}

const mockTodo = [
  {
    id: 0,
    isDone: false,
    content: "운동하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 1,
    isDone: false,
    content: "리액트 공부하기",
    createdDate: new Date().getTime(),
  },
  {
    id: 2,
    isDone: false,
    content: "청소하기",
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [todo, dispatch] = useReducer(reducer, mockTodo);
  const idRef = useRef(3);
  useEffect(() => {
    const rawData = localStorage.getItem("todo");
    if (!rawData) {
      setIsDataLoaded(true);
      return;
    }
    const localData = JSON.parse(rawData);
    if (localData.length == 0) {
      setIsDataLoaded(true);
      return;
    }
    dispatch({ type: "INIT", data: localData });
    setIsDataLoaded(true);
  }, []);
  const onCreate = (content) => {
    dispatch({
      type: "CREATE",
      newItem: {
        id: idRef.current,
        isDone: false,
        content,
        createdDate: new Date().getTime(),
      },
    });
    idRef.current += 1;
  };

  const onUpdate = (targetId) => {
    dispatch({ type: "UPDATE", targetId });
  };

  const onDelete = (targetId) => {
    dispatch({ type: "DELETE", targetId });
  };

  return (
    <div className="App">
      <Header />
      <TodoEditor onCreate={onCreate} />
      <TodoList todo={todo} onUpdate={onUpdate} onDelete={onDelete} />
    </div>
  );
}

export default App;
