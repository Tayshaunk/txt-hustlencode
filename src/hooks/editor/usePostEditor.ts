import { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

export default function usePostEditor(code: string | undefined, setHasChanges: (b: boolean) => void, language: string) {
  const location = useLocation(); //
  const editorUnsavedChangesKey = location.pathname.replace('/', '') + language;
  const editorThemeKey = location.pathname.replace('/', '') + language;

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

  /**
   * Updates the editor state
   * 1. updates code value + localstorage
   * 2. updates hasChanges state
   * @param val The new code value
   */
  const handleEditorChange = (val: string | undefined): void => {
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
  };

  /**
   * Updates the editor ref when the Editor component mounts
   * @param editor 
   */
  const handleEditorDidMount = (editor: any): void => {
    editorRef.current = editor;
  };

  /**
   * Returns total count for lines of code
   * @returns 
   * - Number for total lines of code
   */
  const getLinesCount = (): number => {
    if (editorRef && editorRef.current) return editorRef.current.getModel().getLineCount();

    return 0;
  };

  /**
   * Updates the editors theme and stores the change in local storage
   * @param newTheme
   */
  const updateTheme = (newTheme: string) => {
    localStorage[editorThemeKey] = newTheme;
    setTheme(newTheme);
  };

  return { value, theme, handleEditorDidMount, handleEditorChange, getLinesCount, updateTheme };
}
