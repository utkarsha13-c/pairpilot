"use client";

import { useEffect, useRef, useState } from "react";
import Editor from "@monaco-editor/react";
import { socket } from "@/lib/Socket";

const ROOM_ID = "1234";

export default function CodeEditor() {
  const [code, setCode] = useState("// Start coding...");
  const codeRef = useRef(code);
  const isRemote = useRef(false);

  useEffect(() => {
    socket.emit("join-room", ROOM_ID);

    socket.on("code-update", (incomingCode) => {
      if (incomingCode !== codeRef.current) {
        isRemote.current = true;
        codeRef.current = incomingCode;
        setCode(incomingCode);
      }
    });

    return () => socket.off("code-update");
  }, []);

  const handleChange = (value) => {
    if (!value) return;

    codeRef.current = value;
    setCode(value);

    // ❌ Prevent echo loop
    if (isRemote.current) {
      isRemote.current = false;
      return;
    }

    socket.emit("code-change", {
      roomId: ROOM_ID,
      code: value,
    });
  };

  return (
    <Editor
      height="100%"
      language="javascript"
      theme="vs-dark"
      value={code}
      onChange={handleChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
      }}
    />
  );
}
