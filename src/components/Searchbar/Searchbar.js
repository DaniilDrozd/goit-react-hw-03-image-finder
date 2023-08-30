import React, { Component } from 'react';
import Notiflix from "notiflix";
import css from './Searchbar.module.css';
import propTypes from "prop-types";

class SearchBar extends Component {
  state = {
    searchName: '',
  };

  handleChange = (event) => {
    this.setState({ searchName: event.currentTarget.value.toLowerCase() });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { searchName } = this.state;
    if (!searchName.trim()) {
      Notiflix.Notify.failure("Please enter text!");
      return;
    }
    this.props.onSubmit(searchName);
    this.setState({ searchName: "" });
  };

  render() {
    const { searchName } = this.state;
    return (
      <div className={css.HeaderStyle}>
        <form onSubmit={this.handleSubmit} className={css.FormStyle}>
          <button type="submit" className={css.BtnStyle}>
            <span className={css.SpanStyle}>Search</span>
          </button>

          <input
            className={css.InputStyle}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder=""
            name="searchQuery"
            value={searchName}
            onChange={this.handleChange}
          />
        </form>
      </div>
    );
  }
}

SearchBar.propTypes = {
  onSubmit: propTypes.func.isRequired,
};

export default SearchBar;
