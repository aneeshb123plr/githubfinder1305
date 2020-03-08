import React, { Fragment, useState, useContext } from "react";
import PropTypes from "prop-types";
import GithubContext from "../../context/github/githubContext";
import AlertContext from "../../context/alert/alertContext";

const Search = () => {
  const githubContext = useContext(GithubContext);
  const alertContext = useContext(AlertContext);
  const { setAlert } = alertContext;
  const { clearUsers } = githubContext;
  const [text, setText] = useState("");

  const onChange = e => setText(e.target.value);

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a text to search", "light");
    } else {
      githubContext.searchUsers(text);
    }
  };
  return (
    <Fragment>
      <form className='form' onSubmit={onSubmit}>
        <input
          type='text'
          name='text'
          value={text}
          onChange={onChange}
          placeholder='Searh Users...'
        />
        <input
          type='submit'
          value='search'
          className='btn btn-dark btn-block'
        />
      </form>

      {githubContext.users.length > 0 && (
        <button
          type='submit'
          className='btn btn-light btn-block'
          onClick={clearUsers}
        >
          Clear
        </button>
      )}
    </Fragment>
  );
};

Search.propTypes = {
  setAlert: PropTypes.func.isRequired
};

export default Search;
