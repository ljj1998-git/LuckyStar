import styles from "./index.module.scss";

interface ContentProps {
  children: React.ReactNode; // 定义children为React节点类型
}

export default function Content(props: ContentProps) {
  return <div className={styles.content}>{props.children}</div>;
}
