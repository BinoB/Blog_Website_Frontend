// MarkdownRenderer.js
import React from "react";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }) => {
  return <ReactMarkdown source={content} />;
};

export default MarkdownRenderer;
