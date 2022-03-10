import ReactSplit, { SplitDirection } from '@devbookhq/splitter';
import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import CodeEditor from '../CodeEditor/CodeEditor';
import { useState } from 'react';
import { IUseCodeEditor } from 'interfaces/code.interface';

// styles
import classes from './SplitCodeEditor.module.scss';

interface IProps {
  htmlEditor: IUseCodeEditor;
  cssEditor: IUseCodeEditor;
  jsEditor: IUseCodeEditor;
  isSaving: boolean;
  hasChanges: boolean;
  actionLabel: string;
  children: any;
  exitEditorHandler: () => void;
  saveAndExitHandler?: () => void;
  updateHandler: () => void;
  saveHandler: () => void;
}

const SplitCodeEditor = (props: IProps) => {
  const {
    isSaving,
    hasChanges,
    children,
    htmlEditor,
    cssEditor,
    jsEditor,
    actionLabel,
    exitEditorHandler,
    saveAndExitHandler,
    updateHandler,
    saveHandler,
  } = props;

  // size of row witth the editors (i=0), and the row with the preview (i=1)
  // sizes are percentages - 50.55 b-> .5055
  const [sizes, setSizes] = useState([(1 / 2) * 100, (1 / 2) * 100]);

  // Updates the size of the
  function handleResize(gutterIdx: number, allSizes: number[]) {
    setSizes(allSizes);
  }

  return (
    <ReactSplit
      gutterClassName={classes.gutterDarkV}
      draggerClassName={classes.draggerDarkV}
      direction={SplitDirection.Vertical}
      onResizeFinished={handleResize}
      initialSizes={sizes}
    >
      <ReactSplit direction={SplitDirection.Horizontal} gutterClassName={classes.gutterDarkH} draggerClassName={classes.draggerDarkH}>
        <CodeEditor editor={htmlEditor} height={sizes[0]} title="HTML" defaultLanguage="html" defaultValue="" />
        <CodeEditor editor={cssEditor} height={sizes[0]} title="CSS" defaultLanguage="css" defaultValue="" />
        <CodeEditor editor={jsEditor} height={sizes[0]} title="JS" defaultLanguage="javascript" defaultValue="" />
      </ReactSplit>

      <div className={classes.wrap}>
        <div className={classes.preview}>
          <div className={classes.header}>
            <div className={classes.headerLeft}>
              <ButtonSpinner
                className={classes.btn}
                size="xs"
                color="red"
                type={'button'}
                appearance={'primary'}
                label={'Exit Editor'}
                isLoading={false}
                disabled={isSaving}
                onClick={exitEditorHandler}
              />

              {saveAndExitHandler ? (
                <ButtonSpinner
                  className={classes.btn}
                  size="xs"
                  color="green"
                  type={'button'}
                  appearance={'primary'}
                  label={'Save And Exit'}
                  isLoading={false}
                  disabled={isSaving}
                  onClick={saveAndExitHandler}
                />
              ) : (
                <div />
              )}
            </div>

            <div className={classes.headerRight}>
              <ButtonSpinner
                className={classes.btn}
                size="xs"
                color="blue"
                type={'button'}
                appearance={'primary'}
                label={'Update Preview'}
                isLoading={false}
                disabled={!hasChanges || isSaving}
                onClick={updateHandler}
              />

              <ButtonSpinner
                className={classes.btn}
                size="xs"
                color="green"
                type={'button'}
                appearance={'primary'}
                label={actionLabel}
                isLoading={isSaving}
                disabled={isSaving}
                onClick={saveHandler}
              />
            </div>
          </div>
          <div className={classes.postContainer}>
            <div className={classes.post}>{children}</div>
          </div>
        </div>
      </div>
    </ReactSplit>
  );
};

export default SplitCodeEditor;
