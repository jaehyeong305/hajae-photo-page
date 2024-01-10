import { UnsplashPhoto } from '@/types/unsplash';
import styles from './modal.module.css';
import Image from 'next/image';

type ModalProps = {
    photoInfo: UnsplashPhoto;
    onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ onClose, photoInfo }) => {
    return (
        <div className={styles.ModalBackground}>
            <div className={styles.ModalContent}>
                <div className={styles.ModalHeader}>
                    <div onClick={onClose}>X</div>
                </div>
                <div>
                    <Image src={photoInfo.urls.full} width={400} height={400} alt={photoInfo.alt_description} />
                </div>
                <div>
                    {photoInfo.id}
                </div>
            </div>
        </div>
    )
}

export default Modal;