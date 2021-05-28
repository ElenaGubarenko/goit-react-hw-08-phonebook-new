// import PropTypes from 'prop-types';
import styles from './Container.module.css';

const Container = ({ children }) => {
  return <div className={styles.Container}>{children}</div>;
};

export default Container;
