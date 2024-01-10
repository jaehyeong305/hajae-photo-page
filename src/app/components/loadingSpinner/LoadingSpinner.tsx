import styles from './loadingSpinner.module.css';

const LoadingSpinner: React.FC = () => {
    return (
        <div className={styles.Loading}>
            <div className={styles.LoadingSpinner}></div>
            <div>Loading...</div>
        </div>
    )
}

export default LoadingSpinner;