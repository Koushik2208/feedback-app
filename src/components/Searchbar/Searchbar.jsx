import { Search } from "lucide-react"; // Importing the search icon
import styles from "./Searchbar.module.css";

const Searchbar = () => {
  return (
    <div className={styles.searchbar}>
      <input
        type="text"
        placeholder="Search surveys ..."
        className={styles.input}
      />
      <button className={styles.iconButton}>
        <Search size={20} />
      </button>
    </div>
  );
};

export default Searchbar;
