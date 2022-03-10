import { useNavigate } from 'react-router-dom';
import pageLayoutClasses from 'styles/modules/pageLayout.module.scss';
import usePostEditor from 'hooks/usePostEditor';
import { UpdateHustlencodePostDto } from 'dtos/hustlencode-post.dto';
import useIsMobile from 'hooks/useIsMobile';
import MobileTabs from '../../components/MobileTabs/MobileTabs';
import SplitCodeEditor from '../../components/SplitCodeEditor/SplitCodeEditor';
import { Button, Modal } from 'rsuite';
import Aux from 'components/_Aux/_Aux';
import PageLoader from 'components/PageLoader/PageLoader';
import NotFoundRender from 'components/NotFoundRender/NotFoundRender';
import { openErrorToaster } from 'services/toast.service';

// styles
import classes from './EditProfileAbout.module.scss';
import useUpdateProfileAbout from 'hooks/useUpdateProfileAbout';
import ProfilePreviewModule from 'components/ProfilePreviewModule/ProfilePreviewModule';

const EditProfileAbout = () => {
  // get react router navigate
  const navigate = useNavigate();

  // get state for updating post content
  const postUpdates = useUpdateProfileAbout();

  // gets the html editor state
  const htmlEditor = usePostEditor(postUpdates.value?.html, postUpdates.setHasChanges, 'html');

  // gets the css editor state
  const cssEditor = usePostEditor(postUpdates.value?.css, postUpdates.setHasChanges, 'css');

  // gets the js editor state
  const jsEditor = usePostEditor(postUpdates.value?.js, postUpdates.setHasChanges, 'js');

  // tracks is screen width is within mobile range
  const isMobile = useIsMobile();

  /**
   * Calls method to update the post preview
   */
  const updateHandler = () => {
    // get total lines of code for each editor
    const linesOfCode = htmlEditor.getLinesCount() + cssEditor.getLinesCount() + jsEditor.getLinesCount();

    // update preview
    postUpdates.setValue({ html: htmlEditor.value, css: cssEditor.value, js: jsEditor.value, linesOfCode });
  };

  /**
   * Constructs the payload using the updated values
   * and calls method to make server req
   */
  const saveHandler = async () => {
    if (!areEditorsEmpty()) {
      // get total lines of code for each editor
      const linesOfCode = htmlEditor.getLinesCount() + cssEditor.getLinesCount() + jsEditor.getLinesCount();

      // construct update payload
      const payload: UpdateHustlencodePostDto = {
        html: htmlEditor.value,
        css: cssEditor.value,
        js: jsEditor.value,
        linesOfCode,
      };

      // save changes
      await postUpdates.saveChanges(payload);
    } else {
      openErrorToaster('Please write some code code first.', 3000);
    }
  };

  /**
   * Navigates user to profile page
   */
  const exitEditorHandler = () => {
    navigate('/');
  };

  /**
   * Saves changes and then navigates user to the profile
   * page
   */
  const saveAndExitHandler = async () => {
    if (!areEditorsEmpty()) {
      // get total lines of code for each editor
      const linesOfCode = htmlEditor.getLinesCount() + cssEditor.getLinesCount() + jsEditor.getLinesCount();

      // construct update payload
      const payload: UpdateHustlencodePostDto = {
        html: htmlEditor.value,
        css: cssEditor.value,
        js: jsEditor.value,
        linesOfCode,
      };

      // update post and return to profile
      await postUpdates.saveAndExit(payload);
    } else {
      openErrorToaster('Please write some code code first.', 3000);
    }
  };

  const areEditorsEmpty = (): boolean => {
    if (htmlEditor.value.trim() === '' && cssEditor.value.trim() === '' && jsEditor.value.trim() === '') return true;

    return false;
  };

  /**
   * Checks if the device viewport is within the
   * mobile device range or desktop and renders
   * the appropriate view containing code editors and
   * post preview
   * @returns
   */
  const renderPostEditors = () => (
    <Aux>
      <NotFoundRender val={postUpdates.value}>
        {isMobile.value ? (
          <MobileTabs
            htmlEditor={htmlEditor}
            cssEditor={cssEditor}
            jsEditor={jsEditor}
            exitEditorHandler={exitEditorHandler}
            saveAndExitHandler={saveAndExitHandler}
            saveHandler={saveHandler}

            isSaving={postUpdates.isSaving}

            actionLabel="Save Changes"
            updateHandler={updateHandler}
          >
            {postUpdates.value ? (
              <ProfilePreviewModule profileCode={postUpdates.value} key={'aboutWidget'} title={'About'} />
            ) : (
              <PageLoader style={{ height: '100%', width: '100%' }} isVisible={true} fullscreen={false} theme={'light'} />
            )}
          </MobileTabs>
        ) : (
          <SplitCodeEditor
            htmlEditor={htmlEditor}
            cssEditor={cssEditor}
            jsEditor={jsEditor}
            exitEditorHandler={exitEditorHandler}
            updateHandler={updateHandler}
            saveAndExitHandler={saveAndExitHandler}
            saveHandler={saveHandler}
            isSaving={postUpdates.isSaving}
            hasChanges={postUpdates.hasChanges}
            actionLabel="Save Changes"
          >
            {postUpdates.value ? <ProfilePreviewModule profileCode={postUpdates.value} key={'aboutWidget'} title={'About'} /> : <div />}
          </SplitCodeEditor>
        )}
      </NotFoundRender>
    </Aux>
  );

  return (
    <div className={`${pageLayoutClasses.pageWrapper} ${classes.container}`} id="wrapper">
      <Modal backdrop="static" role="alertdialog" open={postUpdates.showUnsavedChanges} onClose={postUpdates.closeModal} size="xs">
        <Modal.Body>
          <p>Would you like to restore unsaved changes?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={postUpdates.applyUnsavedChanges} appearance="primary">
            Restore Changes
          </Button>
          <Button onClick={postUpdates.discardChanges} appearance="subtle">
            Discard
          </Button>
        </Modal.Footer>
      </Modal>

      {postUpdates.isDoneLoading ? renderPostEditors() : <PageLoader isVisible={true} fullscreen={true} theme={'dark'} />}
    </div>
  );
};

export default EditProfileAbout;
