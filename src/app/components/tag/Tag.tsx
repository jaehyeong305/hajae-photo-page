import styles from './tag.module.css';

type TagProps = {
    title: string;
}

const Tag: React.FC<TagProps> = ({ title }) => {
    return (
        <div className={styles.TagWrapper}>
            <span className={styles.Tag}>{title}</span>
        </div>
    )
}

export default Tag;