import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import LoginForm from './components/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import Fade from 'components/Fade/Fade';
import LogoBrand from 'components/Logos/LogoBrand/LogoBrand';

// images
import backgroundImage from 'assets/images/login-background.jpg';

// styles
import classes from './Login.module.scss';
import { PICKER_LANGUAGE } from 'constants/picker';
import { SelectPicker } from 'rsuite';
import OceanScene from './components/OceanScene/OceanScene';

/**
 * Renders a view with a welcome message and Login
 * Form. Users are able to sign in with their credentials
 * @returns
 */
const Login = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (language: 'en' | 'span') => {
    i18n.changeLanguage(language);
  };

  return (
    <Container className={`${classes.loginContainer} g-0`} fluid>
      <Row className={classes.row}>
        <Col className={classes.leftCol} md={12} lg={5}>
          <Fade duration={400} delay={200}>
            <div className={classes.navbar}>
              <LogoBrand color="#273647" />
              <SelectPicker
                style={{ minWidth: 75 }}
                value={i18n.language || 'en'}
                searchable={false}
                size="xs"
                placeholder=""
                data={PICKER_LANGUAGE}
                onSelect={changeLanguage}
                cleanable={false}
              />
            </div>
          </Fade>

          <Fade duration={400} delay={250}>
            <LoginForm />
          </Fade>
        </Col>

        <Col className={classes.rightCol} md={12} lg={7}>
          <div className={classes.bgImageContainer}>
            <OceanScene />
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
