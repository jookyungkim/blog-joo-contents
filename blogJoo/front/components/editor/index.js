import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";

import styled from "styled-components";

import { backUrl } from "../../config/config";
import EditorToolbar, { formats } from "./EditorToolbar";
// or const { useQuill } = require('react-quilljs');

import "quill/dist/quill.snow.css"; // Add css for snow theme
// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

// Add sizes to whitelist and register them
const Size = Quill.import("formats/size");
Size.whitelist = ["extra-small", "small", "medium", "large"];
Quill.register(Size, true);

// Add fonts to whitelist and register them
const Font = Quill.import("formats/font");
Font.whitelist = ["arial", "comic-sans", "courier-new", "georgia", "helvetica", "lucida"];
Quill.register(Font, true);

const ReactQuillCustom = styled(ReactQuill)`
  .ql-container.ql-snow {
    /* border: none; */
    height: 100%;
    height: 430px;
  }
`;

const Editor = ({ text, handleChange }) => {
  const editorRef = useRef(null);
  //const dispatch = useDispatch();
  //const { uploadImageDone, imagePath } = useSelector(state => state.post);

  const insertToEditor = url => {
    // 현재 커서 위치에 이미지를 삽입하고 커서 위치를 +1 하기
    const range = editorRef.current.getEditorSelection();
    editorRef.current.getEditor().insertEmbed(range.index, "image", `${backUrl}/${url}`);
    editorRef.current.getEditor().setSelection(range.index + 1);
  };

  const saveToServer = file => {
    const imageFormData = new FormData();
    imageFormData.append("image", file); // back 서버에서 req.body.image

    const xhr = new XMLHttpRequest();
    xhr.open("POST", `${backUrl}/post/images`, true);
    xhr.onload = () => {
      if (xhr.status === 201) {
        const url = JSON.parse(xhr.responseText);
        insertToEditor(url);
      }
    };
    xhr.send(imageFormData);

    // dispatch({
    //   type: UPLOAD_IMAGE_REQUEST,
    //   data: imageFormData
    // });
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

  // useEffect(() => {
  //   if (uploadImageDone) {
  //     console.log("imagePath", imagePath);
  //     insertToEditor(imagePath);
  //   }
  // }, [imagePath, uploadImageDone]);

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

      <style jsx>{``}</style>
    </>
  );
};

export default Editor;
