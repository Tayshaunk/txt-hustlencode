import { useEffect, useRef, useState } from 'react';
import Editor from '@monaco-editor/react';
import { useLocation } from 'react-router-dom';

export default function usePostEditor(code: string | undefined, setHasChanges: (b: boolean) => void, language: string) {
  const location = useLocation(); //
  const editorUnsavedChangesKey = location.pathname.replace('/', '') + language;

  // editor state
  const [value, setValue] = useState<string>('');
  const [theme, setTheme] = useState<string>('vs-dark');

  // editor ref
  const editorRef = useRef<any>(null);

  /**
   * Updates the editor original code value
   */
  useEffect(() => {
    let mounted = true;

    if (mounted && code) {
      setValue(code);
    }

    return () => {
      mounted = false;
    };
  }, [code]);

  function handleEditorChange(val: string | undefined, event: any): void {
    if (val) {
      localStorage[editorUnsavedChangesKey] = val;
      setValue(val);
    } else {
      localStorage[editorUnsavedChangesKey] = '';
      setValue('');
    }

    // only mark as changes if new value is different from original value and original
    // is not empty
    if (value !== val && value !== '') {
      setHasChanges(true);
    } else {
      setHasChanges(false);
    }
  }

  function handleEditorDidMount(editor: any, monaco: any): void {
    editorRef.current = editor;
  }

  function getLinesCount(): number {
    if (editorRef && editorRef.current) return editorRef.current.getModel().getLineCount();

    return 0;
  }

  return { value, theme, handleEditorDidMount, handleEditorChange, getLinesCount };
}
