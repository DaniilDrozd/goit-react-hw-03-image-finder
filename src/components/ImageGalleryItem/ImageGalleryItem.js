import React, { Component } from 'react';
import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';
import Modal from 'components/Modal/Modal';

class ImageGalleryItem extends Component {
  state = {
    showModal: false,
  };

  handleModalToggle = () => {
    this.setState(prevState => ({ showModal: !prevState.showModal }));
  };

  render() {
    const { item } = this.props;
    const { showModal } = this.state;

    return (
      <div className={css.ImageGalleryItem}>
        <img
          className={css.ImageGalleryItemImg}
          src={item.webformatURL}
          alt={item.tags}  
          onClick={this.handleModalToggle}
        />
        {showModal && (
          <Modal
            ImageURL ={item.largeImageURL}
            tags={item.tags}
            onClose={this.handleModalToggle}
          />
        )}
      </div>
    );
  }
}

ImageGalleryItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
  }).isRequired, 
};

export default ImageGalleryItem;

