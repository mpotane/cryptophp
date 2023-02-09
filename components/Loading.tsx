import styles from "./Loading.module.css";

export default function Loading() {
  return (
    <div className="min-h-screen grid place-items-center">
      <div className={styles.loader}>
        <span>loading</span>
        <span>loading</span>
      </div>
    </div>
  );
}
