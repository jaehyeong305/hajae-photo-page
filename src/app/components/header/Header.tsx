import styles from "./header.module.css";
import Image from 'next/image'
import logo from '/public/images/logo.jpg'
import bookmark from '/public/images/bookmark.svg'
import Link from "next/link";
import CustomButton from "../customButton/CustomButton";

const Header: React.FC = () => {
    return (
        <div className={styles.HeaderWrapper}>
            <div>
                <Link href="/">
                    <Image className={styles.logo} src={logo.src} width={50} height={50} alt="logo" />
                </Link>
            </div>
            <div>
                <Link href="/bookmark" style={{ textDecoration: "none" }}>
                    <CustomButton value="북마크" icon={<Image src={bookmark.src} width={16} height={16} alt="bookmark" />}/>
                </Link>
            </div>
        </div>
    )
}

export default Header;