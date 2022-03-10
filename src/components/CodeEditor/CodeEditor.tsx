import Editor, { OnMount, OnChange } from '@monaco-editor/react';

// styles
import classes from './CodeEditor.module.scss';

interface IProps {
  editor: {
    value: string;
    theme: string;
    handleEditorDidMount: OnMount;
    handleEditorChange: OnChange;
  };
  height: number;
  title?: string;
  defaultLanguage: string;
  defaultValue: string;
}

/**
 *
 * @param props
 * @returns
 */
const CodeEditor = (props: IProps) => {
  const {  title, editor, defaultValue, defaultLanguage, height } = props;

  return (
    <div className={classes.container}>
      {title ? (
        <div className={classes.header}>
          <div>
            <p className={classes.title}>{title}</p>
          </div>
          <div />
        </div>
      ) : null}
      <div className={classes.editorContainer} style={{ height, width: '100%', backgroundColor: '#1E1E1E' }}>
        <Editor
          onMount={editor.handleEditorDidMount}
          value={editor.value}
          defaultLanguage={defaultLanguage}
          defaultValue={defaultValue}
          onChange={editor.handleEditorChange}
          theme={editor.theme}
          options={{
            scrollBeyondLastLine: true,
            minimap: { enabled: false },
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
