import Image from 'next/image'
import Link from 'next/link'
import '../components/navbar.css'

export default function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Image src="/logo.png" alt="QuickTreat logo" width={220} height={55} />
        <Link href="/" className="menu-link">Voltar ao menu</Link>
      </div>
    </nav>
  )
}