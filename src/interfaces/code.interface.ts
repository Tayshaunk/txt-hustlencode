import { OnChange, OnMount } from "@monaco-editor/react";

export interface IUseCodeEditor {
    value: string;
    theme: string;
    handleEditorDidMount: OnMount;
    handleEditorChange: OnChange;
    getLinesCount: () => number;
  }
  