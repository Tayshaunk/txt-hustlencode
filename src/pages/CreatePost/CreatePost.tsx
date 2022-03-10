import { useNavigate, useParams } from 'react-router-dom';
import pageLayoutClasses from 'styles/modules/pageLayout.module.scss';
import usePostEditor from 'hooks/usePostEditor';
import { CreateHustlencodePostDto } from 'dtos/hustlencode-post.dto';
import useIsMobile from 'hooks/useIsMobile';
import MobileTabs from '../../components/MobileTabs/MobileTabs';
import SplitCodeEditor from '../../components/SplitCodeEditor/SplitCodeEditor';
import { Button, Modal } from 'rsuite';
import Aux from 'components/_Aux/_Aux';
import useCreatePost from 'hooks/useCreatePost';
import { useAppSelector } from 'store/hooks';
import { getUser } from 'store/slices/userSessionSlice';
// styles
import classes from './CreatePost.module.scss';
import { openErrorToaster } from 'services/toast.service';
import PostPreviewModule from 'components/PostPreviewModule/PostPreviewModule';
import PageLoader from 'components/PageLoader/PageLoader';

const CreatePost = () => {
  // get react router navigate
  const navigate = useNavigate();

  const user = useAppSelector(getUser);

  // get route params the post _id
  const { id } = useParams();

  // gets the create post hook
  const createPost = useCreatePost(id);

  // gets the html editor state
  const htmlEditor = usePostEditor(createPost.value?.html, createPost.setHasChanges, 'html');

  // gets the css editor state
  const cssEditor = usePostEditor(createPost.value?.css, createPost.setHasChanges, 'css');

  // gets the js editor state
  const jsEditor = usePostEditor(createPost.value?.js, createPost.setHasChanges, 'js');

  // tracks is screen width is within mobile range
  const isMobile = useIsMobile();

  /**
   * Calls method to update the post preview
   */
  const updateHandler = () => {
    // get total lines of code for each editor
    const linesOfCode = htmlEditor.getLinesCount() + cssEditor.getLinesCount() + jsEditor.getLinesCount();

    // update preview
    createPost.setValue({ html: htmlEditor.value, css: cssEditor.value, js: jsEditor.value, linesOfCode });
  };

  /**
   * Constructs the payload using the code values
   * and calls method to make server req
   */
  const saveHandler = async () => {
    if (!areEditorsEmpty()) {
      // get total lines of code for each editor
      const linesOfCode = htmlEditor.getLinesCount() + cssEditor.getLinesCount() + jsEditor.getLinesCount();

      // construct create payload
      const payload: CreateHustlencodePostDto = {
        html: htmlEditor.value,
        css: cssEditor.value,
        js: jsEditor.value,
        linesOfCode,
      };

      // save post data
      await createPost.saveChanges(payload);
    } else {
      openErrorToaster('Please write some code code first.', 3000);
    }
  };

  const areEditorsEmpty = (): boolean => {
    if (htmlEditor.value.trim() === '' && cssEditor.value.trim() === '' && jsEditor.value.trim() === '') return true;

    return false;
  };

  /**
   * Navigates user to profile page
   */
  const exitEditorHandler = () => {
    navigate('/');
  };

  const renderPostEditors = () => (
    <Aux>
      {isMobile.value ? (
        <MobileTabs
          htmlEditor={htmlEditor}
          cssEditor={cssEditor}
          jsEditor={jsEditor}
          exitEditorHandler={exitEditorHandler}
          saveHandler={saveHandler}
          isSaving={createPost.isSaving}
          actionLabel="Create Post"
          updateHandler={updateHandler}
        >
          {user && createPost.value ? (
            <PostPreviewModule postCode={createPost.value} createdOn={new Date()} postUser={user} />
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
          saveHandler={saveHandler}
          isSaving={createPost.isSaving}
          hasChanges={createPost.hasChanges}
          actionLabel="Create Post"
        >
          {user && createPost.value ? <PostPreviewModule postCode={createPost.value} createdOn={new Date()} postUser={user} /> : <div />}
        </SplitCodeEditor>
      )}
    </Aux>
  );

  return (
    <div className={`${pageLayoutClasses.pageWrapper} ${classes.container}`} id="wrapper">
      <Modal backdrop="static" role="alertdialog" open={createPost.showUnsavedChanges} onClose={createPost.closeModal} size="xs">
        <Modal.Body>
          <p>Would you like to restore unsaved changes?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={createPost.applyUnsavedChanges} appearance="primary">
            Restore Changes
          </Button>
          <Button onClick={createPost.discardChanges} appearance="subtle">
            Discard
          </Button>
        </Modal.Footer>
      </Modal>

      {renderPostEditors()}
    </div>
  );
};

export default CreatePost;
