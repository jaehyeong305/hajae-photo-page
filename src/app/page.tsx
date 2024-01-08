import styles from './page.module.css'
import Header from './components/header/Header'
import Search from './components/search/Search'

export default function Home() {
  return (
    <main className={styles.main}>
      <Header/>
      <Search/>
    </main>
  )
}
