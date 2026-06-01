"use client";

import { useEffect, useState } from "react";

export default function TempExtractPage() {
  const [output, setOutput] = useState<string>("Running calculation...");

  useEffect(() => {
    // We can run browser-based extraction here!
    fetch("/api/extract-sangli-data")
      .then(res => res.json())
      .then(data => {
        setOutput(JSON.stringify(data, null, 2));
      })
      .catch(err => {
        setOutput("Error: " + err.message);
      });
  }, []);

  return (
    <pre style={{ padding: 20, whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
      {output}
    </pre>
  );
}
