import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import LoginForm from './components/LoginForm/LoginForm';
import { useTranslation } from 'react-i18next';
import Fade from 'components/Fade/Fade';
import LogoBrand from 'components/Logos/LogoBrand/LogoBrand';
import { PICKER_LANGUAGE } from 'constants/picker.constants';
import { SelectPicker } from 'rsuite';
import useLocalStorage from 'use-local-storage';
import { Toggle } from 'rsuite';

// styles
import classes from './Login.module.scss';
import OceanScene from 'components/OceanScene/OceanScene';
import { COLOR } from 'rsuite/esm/utils';

/**
 * Renders a view with a welcome message and Login
 * Form. Users are able to sign in with their credentials
 * @returns
 */
const Login = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: 'en' | 'span') => {
    i18n.changeLanguage(language);
  };

  const defaultDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const [theme, setTheme] = useLocalStorage('theme', defaultDark ? 'dark' : 'light');

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  };

  return (
    <Container className={`${classes.loginContainer} g-0`} fluid data-theme={theme}>
      <Row className={classes.row}>
        <Col className={classes.leftCol} md={12} lg={5}>
          <Fade duration={400} delay={200}>
            <div className={classes.navbar}>
              <LogoBrand color="#273647" />
              {/* <button onClick={switchTheme}>Switch to {theme === 'light' ? 'Dark' : 'Light'} Theme</button> */}
              <Toggle arial-label="Switch" onChange={switchTheme}>
                Switch to {theme === 'light' ? 'Dark' : 'Light'}
              </Toggle>

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
