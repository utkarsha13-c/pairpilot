"use client";
import Editor from "@monaco-editor/react";
import { socket } from "@/lib/Socket";

export default function CodeEditor({ value, setCode, roomCode }) {
  const handleChange = (val) => {
    setCode(val);

    socket.emit("code-change", {
      roomCode,
      code: val,
    });
  };

  return (
    <div style={{ height: "90vh" }}>
      <Editor
        height="100%"
        defaultLanguage="javascript"
        value={value}
        onChange={handleChange}
      />
    </div>
  );
}
