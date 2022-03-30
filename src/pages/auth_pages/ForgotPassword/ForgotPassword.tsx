import React from 'react';
import { Col, Row, Container } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import Fade from 'components/Fade/Fade';
import LogoBrand from 'components/Logos/LogoBrand/LogoBrand';
import { PICKER_LANGUAGE } from 'constants/picker.constants';
import { SelectPicker } from 'rsuite';
import OceanScene from '../../../components/OceanScene/OceanScene';

// styles
import classes from './ForgotPassword.module.scss';
import ForgotPasswordForm from './components/ForgotPasswordForm/ForgotPasswordForm';

/**
 * Renders a view with a welcome message and Login
 * Form. Users are able to sign in with their credentials
 * @returns
 */
const ForgotPassword = () => {
  const { i18n } = useTranslation();

  const changeLanguage = (language: 'en' | 'span') => {
    i18n.changeLanguage(language);
  };

  return (
    <Container className={`${classes.container} g-0`} fluid>
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
            <ForgotPasswordForm />
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

export default ForgotPassword;
