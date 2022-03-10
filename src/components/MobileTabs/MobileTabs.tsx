import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { IUseCodeEditor } from 'interfaces/code.interface';
import { useState } from 'react';
import { Button } from 'rsuite';
import CodeEditor from '../CodeEditor/CodeEditor';
import classes from './MobileTabs.module.scss';

interface IProps {
  htmlEditor: IUseCodeEditor;
  cssEditor: IUseCodeEditor;
  jsEditor: IUseCodeEditor;
  isSaving: boolean;
  children: any;
  actionLabel: string;
  exitEditorHandler: () => void;
  saveAndExitHandler?: () => void;
  saveHandler: () => void;
  updateHandler: () => void;
}

const tabs = [
  {
    label: 'HTML',
  },
  {
    label: 'CSS',
  },
  {
    label: 'JS',
  },
  {
    label: 'Preview',
  },
];

const MobileTabs = (props: IProps) => {
  const { isSaving, htmlEditor, cssEditor, jsEditor, actionLabel, children, exitEditorHandler, saveAndExitHandler, saveHandler, updateHandler } =
    props;

  // current active tab
  const [activeTab, setActiveTab] = useState<number>(3);

  return (
    <div className={classes.tabToolBarWrapper}>
      <div className={classes.tabButtonToolBar}>
        {tabs.map((t, i) => (
          <div key={t.label} className={`${classes.tab} ${i === activeTab ? classes.active : ''}`}>
            <Button
              className={classes.tabBtn}
              onClick={() => {
                setActiveTab(i);
                if (i === 3) {
                  console.log('update');
                  updateHandler();
                }
              }}
            >
              <p>{t.label}</p>
            </Button>
          </div>
        ))}
      </div>

      <div style={{ display: activeTab === 0 ? 'block' : 'none' }} className={classes.editorContainer}>
        <CodeEditor editor={htmlEditor} height={100} defaultLanguage="html" defaultValue="" />
      </div>

      <div style={{ display: activeTab === 1 ? 'block' : 'none' }} className={classes.editorContainer}>
        <CodeEditor editor={cssEditor} height={100} defaultLanguage="css" defaultValue="" />
      </div>

      <div style={{ display: activeTab === 2 ? 'block' : 'none' }} className={classes.editorContainer}>
        <CodeEditor editor={jsEditor} height={100} defaultLanguage="javascript" defaultValue="" />
      </div>

      <div style={{ display: activeTab === 3 ? 'flex' : 'none' }} className={classes.postContainer}>
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
                isLoading={isSaving}
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

        <div className={classes.post}>{children}</div>
      </div>
    </div>
  );
};

export default MobileTabs;
