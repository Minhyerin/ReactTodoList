import React, { useMemo, useState } from "react";
import TodoItem from "./TodoItem";

const TodoList = ({ todo, onUpdate, onDelete }) => {
  const [keyword, setKeyword] = useState("");
  const onChangekeyword = (e) => {
    setKeyword(e.target.value);
  };

  const getSearchResult = () => {
    return keyword === ""
      ? todo
      : todo.filter((item) =>
          item.content.toLowerCase().includes(keyword.toLowerCase())
        );
  };

  const analyzeTodo = useMemo(() => {
    const totalCount = todo.length;
    const doneCount = todo.filter((item) => item.isDone).length;
    const notDoneCount = totalCount - doneCount;
    return {
      totalCount,
      doneCount,
      notDoneCount,
    };
  }, [todo]);
  const { totalCount, doneCount, notDoneCount } = analyzeTodo;

  return (
    <div className="TodoList">
      <h3>Todo List 📃</h3>
      <div className="count-wrapper">
        <div>Total: {totalCount}개</div>
        <div>해야할 일: {notDoneCount}개</div>
        <div>완료한 일: {doneCount}개</div>
      </div>
      <input
        onChange={onChangekeyword}
        value={keyword}
        type="text"
        placeholder="🔎 검색어를 입력하세요"
      />
      <div className="todoItem_wrapper">
        {getSearchResult().map((item) => (
          <TodoItem
            key={item.id}
            {...item}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default TodoList;
