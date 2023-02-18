import { useEffect } from 'react';
import PropTypes from 'prop-types';
import styles from 'components/Modal/Modal.module.css';

export const Modal = ({image, close}) => {
  
useEffect(() => {
  window.addEventListener('keydown', close);
  return () => {
    window.removeEventListener('keydown', close)
  }
})

  return <div className={styles.overlay} onClick={close}>
    <div className={styles.modal}>
      <img src={image.largeImageURL} alt={image.tags} />
    </div>
  </div>
}

Modal.propTypes = {
  image: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired}).isRequired,
  close: PropTypes.func.isRequired
};