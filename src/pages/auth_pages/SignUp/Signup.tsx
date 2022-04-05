import { Col, Row, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import SignupForm from './components/SignupForm/SignupForm';
import Fade from 'components/Fade/Fade';
import LogoBrand from 'components/Logos/LogoBrand/LogoBrand';
import { PICKER_LANGUAGE } from 'constants/picker.constants';
import { SelectPicker } from 'rsuite';

// Styles
import classes from './Signup.module.scss';
import OceanScene from 'components/OceanScene/OceanScene';

const Signup = () => {
  return (
    <Container className={`${classes.signUpContainer} g-0`} fluid>
      <Row className={classes.row}>
        <Col className={classes.leftCol} md={12} lg={5}>
          <Fade duration={400} delay={200}>
            <div className={classes.navbar}>
              <LogoBrand color="#273647" />
              {/* Add spanish translation here */}
            </div>
          </Fade>

          {/* Signup Form Here */}
          <SignupForm />
        </Col>

        {/* Ocean Scene here */}
        <Col className={classes.rightCol} md={12} lg={7}>
          <div className={classes.bgImageContainer}>
            <OceanScene />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Signup;
