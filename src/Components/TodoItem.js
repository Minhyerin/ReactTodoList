import React from "react";

const TodoItem = ({ id, isDone, content, createdDate, onUpdate, onDelete }) => {
  const onChangeUpdate = () => {
    onUpdate(id);
  };
  const onClickDeltete = () => {
    onDelete(id);
  };
  return (
    <div className="TodoItem">
      <div className="checkbox-col">
        <input onChange={onChangeUpdate} type="checkbox" checked={isDone} />
      </div>
      <div
        style={
          isDone
            ? { textDecoration: "line-through", color: "cornflowerblue" }
            : { textDecoration: "none" }
        }
        className="content-col"
      >
        {content}
      </div>
      <div className="date-col">
        {new Date(createdDate).toLocaleDateString()}
      </div>
      <div className="btn-col">
        <button onClick={onClickDeltete}>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
