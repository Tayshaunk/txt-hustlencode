import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useMemo, useRef, useState } from 'react';
import { Input, InputGroup } from 'rsuite';
import debounce from 'lodash.debounce';
import { useAppDispatch } from 'store/hooks';
import { logout } from 'store/slices/userSessionSlice';
import { serverErrorHandler } from 'services/server-error.service';
import { getUserSearchApi } from 'api/search.api';
import { NavLink } from 'react-router-dom';
import Aux from 'components/_Aux/_Aux';
import ProfileImage from 'components/ProfileImage/ProfileImage';
import useOutsideClick from 'hooks/shared/useOutsideClick';

// styles
import classes from './NavbarSearch.module.scss';

const WIDTH = 250;

export interface ISearchResult {
  name: string;
  username: string;
  profileImg: string | null;
  gender: Gender;
}

const NavbarSearch = () => {
  // search value for username search
  const [searchValue, setSearchValue] = useState<string>('');
  // tracks if results are being fetched
  const [isFetching, setIsFetching] = useState<boolean>(false);
  // search result list
  const [searchResults, setSearchResults] = useState<ISearchResult[]>([]);
  // tracks if the search results container show be shown/hidden
  const [showResults, setShowResults] = useState<boolean>(false);

  // get redux dispatcher
  const dispatch = useAppDispatch();

  // clears user session
  const logoutHandler = () => dispatch(logout());

  const resultsRef: any = useRef(null);
  const searchRef: any = useRef(null);

  // listen for clicks outside results container
  // hide container when clicks outside happen
  useOutsideClick(resultsRef, () => {
    setShowResults(false);
  });

  /**
   * Makes api request for search results and stores
   * the result in the state
   * @param val
   */
  const fetchResults = async (val: string) => {
    if (val.trim() !== '') {
      try {
        const data = await getUserSearchApi(val);

        setSearchResults(data);
        setIsFetching(false);
      } catch (e) {
        setIsFetching(false);
        serverErrorHandler(e, logoutHandler);
      }
    }
  };

  /**
   * debounce search with 300ms wait time
   * Ignore continous search calls until  timer has
   * elapsed
   *
   */
  const debouncedChangeHandler = useMemo(
    () => debounce(fetchResults, 300),
    // TODO Resolve 'react-hooks/exhaustive-deps'
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  const searchClickHandler = () => {
    if (searchResults.length > 0) {
      setShowResults(true);
    }
  };

  const resetState = () => {
    setShowResults(false);
    setIsFetching(false);
    setSearchResults([]);
    setSearchValue('');
    if (searchRef && searchRef.current) {
      searchRef.current.value = '';
    }
  };

  const renderResults = () => (
    <Aux>
      {searchResults.map(result => (
        <NavLink end key={result.username} className={classes.searchResult} to={`/user/${result.username}`} onClick={resetState}>
          <div className={classes.image}>
            <ProfileImage url={result.profileImg} gender={result.gender} />
          </div>

          <div className={classes.details}>
            <p>{result.name}</p>
            <p>{result.username}</p>
          </div>
        </NavLink>
      ))}
    </Aux>
  );

  /**
   * Renders the container that holds the search results
   * @returns
   */
  const renderResultContainer = () => (
    <div style={{ width: WIDTH + 40 }} className={classes.results} ref={resultsRef}>
      {isFetching ? (
        <div className={classes.spinner}>
          <FontAwesomeIcon icon={faSpinner} spin />
        </div>
      ) : (
        renderResults()
      )}

      {isFetching ? (
        <div className={classes.searching}>
          <p>Searching users....</p>
        </div>
      ) : (
        <div className={classes.link}>
          <NavLink to={`/search/${searchValue}`}>
            <FontAwesomeIcon style={{ marginRight: 6 }} icon={faSearch} />
            Search for "{searchValue}"
          </NavLink>
        </div>
      )}
    </div>
  );

  /**
   * Updates the the show/hide state of the search results
   * container. If a value is present, the container is shown
   * and a async req is made for results
   * @param val Search value
   */
  const searchChangeHandler = (val: string) => {
    if (val.trim() !== '') {
      // show result container
      setShowResults(true);
      // show fetch spinner
      setIsFetching(true);
      setSearchValue(val);
      // debounce async req
      debouncedChangeHandler(val);
    } else {
      // hide results container
      setShowResults(false);
      // hide spinner
      setIsFetching(false);
      // clear results
      setSearchResults([]);
    }
  };

  return (
    <div className={classes.inputGroup}>
      <InputGroup className={classes.group}>
        <InputGroup.Addon>
          <FontAwesomeIcon icon={faSearch} />
        </InputGroup.Addon>
        <Input
          ref={searchRef}
          onClick={searchClickHandler}
          style={{ width: WIDTH }}
          onChange={searchChangeHandler}
          placeholder="Search other users"
        />
      </InputGroup>

      {showResults ? renderResultContainer() : null}
    </div>
  );
};

export default NavbarSearch;
