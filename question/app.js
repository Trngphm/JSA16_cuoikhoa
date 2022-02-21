import { CodeJar } from "https://medv.io/codejar/codejar.js";
import hljs from 'https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.4.0/build/es/highlight.min.js';

const highlight = (editor) => {
  // highlight.js does not trims old tags,
  // let's do it by this hack.
  editor.textContent = editor.textContent;
  hljs.highlightElement(editor);
};

const editor = document.querySelector(".editor");
const jar = new CodeJar(editor, highlight);