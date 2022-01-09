import React from "react";
import ReactQuill from "react-quill";
import styled from "styled-components";
import "react-quill/dist/quill.snow.css";

import EditorToolbar, { modules, formats } from "./EditorToolbar";

const ReactQuillCustom = styled(ReactQuill)`
  .ql-container.ql-snow {
    border: none;
  }
`;

// const EditorToolbarCustom = styled(ReactQuillCustom)`
//   .ql-toolbar.ql-snow {
//     border: 1px solid #ccc;*/
//   }
// `;

const Editor = () => {
  const [state, setState] = React.useState({ value: null });
  const handleChange = value => {
    setState({ value });
  };
  return (
    <>
      <div className="text-editor">
        <EditorToolbar />
        <ReactQuillCustom
          theme="snow"
          value={state.value}
          onChange={handleChange}
          placeholder={"Write something awesome..."}
          modules={modules}
          formats={formats}
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
