import PropTypes from 'prop-types';
import styles from 'components/Button/Button.module.css';

export const Button = ({loadMore}) => {
    return <button className={styles.button} type='button' onClick={loadMore}>Load more</button>
}

Button.propTypes = {
    loadMore: PropTypes.func.isRequired
};