import styles from './customButton.module.css';

type CustomButtonProps = {
    value: string;
    icon?: React.ReactNode;
    customStyle?: React.CSSProperties;
    onClick?: () => void;
}

const CustomButton: React.FC<CustomButtonProps> = ({ value, icon, customStyle, onClick }) => {
    return (
        <div className={styles.CustomButtonWrapper} onClick={onClick} style={customStyle}>
            { value }{ icon }
        </div>
    )
}

export default CustomButton;