"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { socket } from "@/lib/socket";

export default function CodeEditor() {
  const editorRef = useRef(null);
  const isRemote = useRef(false);

  function onMount(editor) {
    editorRef.current = editor;
  }

  function onChange(value) {
    if (isRemote.current) {
      isRemote.current = false;
      return;
    }

    socket.emit("code-change", value);
  }

  useEffect(() => {
    socket.on("code-change", (code) => {
      if (!editorRef.current) return;
      isRemote.current = true;
      editorRef.current.setValue(code);
    });

    return () => socket.off("code-change");
  }, []);

  return (
    <Editor
      height="100%"
      theme="vs-dark"
      defaultLanguage="javascript"
      onMount={onMount}
      onChange={onChange}
    />
  );
}
