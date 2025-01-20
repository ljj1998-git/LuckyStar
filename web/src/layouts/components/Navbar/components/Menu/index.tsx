import styles from "./index.module.scss";

const Menu: React.FC = () => {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <a href="#">HTML</a>
        </li>
        <li>
          <a href="#">CSS</a>
        </li>
        <li>
          <a href="#">JS</a>
        </li>
        <li>
          <a href="#">Jquery</a>
        </li>
        <li>
          <a href="#">VUE</a>
        </li>
        <li>
          <a href="#">PHP</a>
        </li>
        <div className={styles.navBox}></div>
      </ul>
    </div>
  );
};

export default Menu;
