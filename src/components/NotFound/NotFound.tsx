import React from 'react'
import { Button } from 'rsuite'
import {useNavigate} from 'react-router-dom';
import bg from '../../assets/images/404.png';
import classes from './NotFound.module.scss'

/**
 * Shows user that the resource they are trying to access
 * no longer exists or has bee moved
 * @returns
 */
const NotFound = () => {
  const navigate = useNavigate();

  const navigateHome = () => {
    navigate('/');
  }

  return (
    <div className={classes.Container}>
      <img src={bg} alt="404" />
      <h1>Looks like you're lost</h1>
      <p>
        The page you're trying to reach can't be found. Perhaps it was a bad
        link.
      </p>

      <Button color="red" onClick={navigateHome}>
        Go Home
      </Button>
    </div>
  )
}

export default NotFound
