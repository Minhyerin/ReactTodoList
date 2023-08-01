import React, { useRef, useState } from "react";

const TodoEditor = ({ onCreate }) => {
  const contentRef = useRef();
  const [content, setContent] = useState("");
  const onChangeContent = (e) => {
    setContent(e.target.value);
  };
  const onSubmit = () => {
    if (!content) {
      contentRef.current.focus();
      return;
    }
    onCreate(content);
    setContent("");
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

  return (
    <div className="TodoEditor">
      <h3>새로운 Todo 작성하기 🎤</h3>
      <div className="editor_wrapper">
        <input
          ref={contentRef}
          onKeyDown={onKeyDown}
          onChange={onChangeContent}
          value={content}
          type="text"
          placeholder="새로운 todo를 입력하세요"
        />
        <button onClick={onSubmit}>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
