import './Loader.css';

const Loader = ({ size = 6 }) => (
  <div className="loader" style={{ width: `${size}rem`, height: `${size}rem` }}></div>
);

export default Loader;