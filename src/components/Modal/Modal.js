import React, { Component } from "react";
import propTypes from "prop-types";

class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.KeyDown); 
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.removeEventListener("keydown", this.KeyDown); 
  }

  KeyDown = event => { 
    if (event.code === 'Escape') {
      this.props.onClose();
    }
  };

  preventScroll = event => {
    event.preventDefault();
  };

  PagesClose = event => {
    if (event.currentTarget === event.target) {
      this.props.onClose();
    }
  };

  render() {
    const { ImageURL, tags } = this.props;

    return (
      <div className="modal" onClick={this.PagesClose}>
        <div className="modal-content">
          <img src={ImageURL} alt={tags} />
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  ImageURL: propTypes.string.isRequired,
  tags: propTypes.string.isRequired,
  onClose: propTypes.func.isRequired,
};

export default Modal;
