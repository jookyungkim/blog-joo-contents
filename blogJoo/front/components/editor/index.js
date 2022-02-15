import React, { useRef, useCallback, useMemo } from "react";
import dynamic from "next/dynamic";
import ReactQuill from "react-quill";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";

import "react-quill/dist/quill.snow.css";

import { backUrl } from "../../config/config";
import { UPLOAD_IMAGES_REQUEST } from "../../reducers/post";
import EditorToolbar, { formats } from "./EditorToolbar";

const ReactQuillCustom = styled(ReactQuill)`
  .ql-container.ql-snow {
    border: none;
  }
`;

const undoChange = () => {
  //editorRef.history.undo();
};

const redoChange = () => {
  //editorRef.history.redo();
};

const Editor = ({ text, handleChange }) => {
  const editorRef = useRef(null);
  const insertToEditor = url => {
    // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
    const range = editorRef.current.getEditorSelection();
    editorRef.current.getEditor().insertEmbed(range.index, "image", `${backUrl}/${url}`);
    editorRef.current.getEditor().setSelection(range.index + 1);
  };

  const saveToServer = file => {
    const fd = new FormData();
    fd.append("image", file); // back 서버에서 req.body.image

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${backUrl}/post/images`, true);
    xhr.onload = () => {
      console.log("status", xhr);
      if (xhr.status === 201) {
        const url = JSON.parse(xhr.responseText);
        insertToEditor(url[0]);
      }
    };
    xhr.send(fd);
  };

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "imags/*");
    input.click();
    input.onchange = () => {
      const file = input.files[0];
      // file type is only image.
      if (/^image\//.test(file.type)) {
        saveToServer(file);
      } else {
        console.warn("You could only upload images.");
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: "#toolbar",
        handlers: {
          undo: undoChange,
          redo: redoChange,
          image: imageHandler
        }
      },
      history: {
        delay: 500,
        maxStack: 100,
        userOnly: true
      }
    };
  }, []);

  return (
    <>
      <div className="text-editor">
        <EditorToolbar />
        <ReactQuillCustom
          theme="snow"
          value={text}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
          ref={editorRef}
        />
      </div>

      <style jsx>{`
        .ql-container.ql-snow {
          border: none;
        }
      `}</style>
    </>
  );
};

export default Editor;
