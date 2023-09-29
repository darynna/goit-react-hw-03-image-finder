import { Component } from 'react';
import '../styles.css';
import { Modal } from 'components/Modal/Modal';

export class ImageGalleryItem extends Component {
  state = {
    modal: false,
  };

  handleModalOpen = () => {
    this.setState({ modal: true });
  };

  handleModalClose = () => {
     this.setState({ modal: false });
  };

  render() {
    const { id, image, alt, largeImage } = this.props;
    return (
      <>
        <li className="ImageGalleryItem" key={id}>
          <img
            className="ImageGalleryItem-image"
            src={image}
            alt={alt}
            onClick={this.handleModalOpen}
          />
        </li>
        {this.state.modal && (
          <Modal
            largeImage={largeImage}
            alt={alt}
            onClose={this.handleModalClose}
          />
        )}
      </>
    );
  }
}
