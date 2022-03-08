import React, { useRef, useMemo } from "react";
import ReactQuill, { Quill } from "react-quill";
import styled from "styled-components";
import Head from "next/head";

import hljs from "highlight.js";
// import hljs from "highlightjs-line-numbers.js";
//import { highlight, languages } from "prismjs/components/prism-core";

import { backUrl } from "../../config/config";
import EditorToolbar, { formats } from "./EditorToolbar";

import "react-quill/dist/quill.core.css";
import "react-quill/dist/quill.bubble.css";
import "quill/dist/quill.snow.css"; // Add css for snow theme
import "highlight.js/styles/github.css";

// or import 'quill/dist/quill.bubble.css'; // Add css for bubble theme

hljs.configure({
  languages: ["javascript", "ruby", "python", "rust"]
});

// hljsLine.initLineNumbersOnLoad({
//   singleLine: true
// });

//hljs.highlightAll();
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

  // const hightlightWithLineNumbers = (input, language) =>
  //   highlight(input, language)
  //     .split("\n")
  //     .map((line, i) => `<span class='editorLineNumber'>${i + 1}</span>${line}`)
  //     .join("\n");

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

  // const codeBlockHandler = text => {
  //   // console.log(text);
  //   hljs.highlightAuto(text).value;
  // };

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
      },
      syntax: {
        // highlight: code => hightlightWithLineNumbers(code, languages.js).value
        highlight: code => hljs.highlightAuto(code).value
        // highlight: code => hljs.lineNumbersBlock(code).value
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
