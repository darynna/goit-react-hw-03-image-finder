import { Component } from 'react';
import '../styles.css';

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.keyClose);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.keyClose);
  }

  keyClose = e => {
    if (e.key === 'Escape') {
      this.props.onClose();
    }
  };

  handleClose = e => {
    if (e.target === e.currentTarget) {
      this.props.onClose();
    }
  };

  render() {
    return (
      <div className="Overlay" onClick={this.handleClose}>
        <div className="Modal">
          <img src={this.props.largeImage} alt={this.props.alt} />
        </div>
      </div>
    );
  }
}
