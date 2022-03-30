import ButtonSpinner from 'components/Buttons/ButtonSpinner/ButtonSpinner';
import { IUseCodeEditor } from 'interfaces/code.interface';
import { useEffect, useState } from 'react';
import { Button } from 'rsuite';
import CodeEditor from '../CodeEditor/CodeEditor';
import classes from './MobileCodeEditor.module.scss';

interface IProps {
  htmlEditor?: IUseCodeEditor;
  cssEditor?: IUseCodeEditor;
  jsEditor?: IUseCodeEditor;
  isSaving: boolean;
  children: any;
  actionLabel: string;
  exitEditorHandler: () => void;
  saveAndExitHandler?: () => void;
  saveHandler: () => void;
  updateHandler: () => void;
}

const MobileCodeEditor = (props: IProps) => {
  const {
    isSaving,
    htmlEditor,
    cssEditor,
    jsEditor,
    actionLabel,
    children,
    exitEditorHandler,
    saveAndExitHandler,
    saveHandler,
    updateHandler,
  } = props;

  // current active tab
  const [tabs, setTabs] = useState<any[]>([]);
  // current active tab
  const [activeTab, setActiveTab] = useState<number>(tabs.length - 1);

  useEffect(() => {
    let mounted = true;

    function getTabs() {
      const t = [];
      if (htmlEditor) t.push({ label: 'HTML' });
      if (cssEditor) t.push({ label: 'CSS' });
      if (jsEditor) t.push({ label: 'JS' });
      t.push({ label: 'Preview' });

      setTabs(t);
      setActiveTab(t.length - 1);
    }

    if (mounted) getTabs();

    return () => {
      mounted = false;
    };
  }, [htmlEditor, cssEditor, jsEditor]);

  const getTabIndex = (label: string) => {
    return tabs.map(t => t.label).indexOf(label);
  };

  return (
    <div className={classes.tabToolBarWrapper}>
      <div className={classes.tabButtonToolBar}>
        {tabs.map((t, i) => (
          <div key={t.label} className={`${classes.tab} ${i === activeTab ? classes.active : ''}`}>
            <Button
              className={classes.tabBtn}
              onClick={() => {
                setActiveTab(i);
                if (tabs.length - 1 === 3) updateHandler();
              }}
            >
              <p>{t.label}</p>
            </Button>
          </div>
        ))}
      </div>

      {htmlEditor ? (
        <div
          style={{ display: activeTab === getTabIndex('HTML') ? 'block' : 'none' }}
          className={classes.editorContainer}
        >
          <CodeEditor editor={htmlEditor} height={100} defaultLanguage="html" defaultValue="" />
        </div>
      ) : null}

      {cssEditor ? (
        <div style={{ display: activeTab === getTabIndex('CSS') ? 'block' : 'none' }} className={classes.editorContainer}>
          <CodeEditor editor={cssEditor} height={100} defaultLanguage="css" defaultValue="" />
        </div>
      ) : null}

      {jsEditor ? (
        <div style={{ display: activeTab === getTabIndex('JS') ? 'block' : 'none' }} className={classes.editorContainer}>
          <CodeEditor editor={jsEditor} height={100} defaultLanguage="javascript" defaultValue="" />
        </div>
      ) : null}

      <div style={{ display: activeTab === getTabIndex('Preview') ? 'flex' : 'none' }} className={classes.postContainer}>
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

export default MobileCodeEditor;
