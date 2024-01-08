import styles from "./header.module.css";
import Image from 'next/image'
import logo from '/public/images/logo.png'
import bookmark from '/public/images/bookmark.svg'
import Link from "next/link";

const Header: React.FC = () => {
    return (
        <div className={styles.HeaderWrapper}>
            <div>
                <Link href="/">
                    <Image src={logo.src} width={105} height={30} alt="logo" />
                </Link>
            </div>
            <div>
                <Link href="/bookmark" style={{ textDecoration: "none" }}>
                    <button className={styles.bookmark}>
                        북마크 <Image src={bookmark.src} width={16} height={16} alt="bookmark" />
                    </button>
                </Link>
            </div>
        </div>
    )
}

export default Header;