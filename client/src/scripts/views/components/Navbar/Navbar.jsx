import { useState } from 'react'
import Logo from '../../../../assets/logo.svg'
import Button from '../Buttons/Button'
import { NavLink } from 'react-router-dom'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="container fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between gap-12 bg-primary-50 py-6">
      <div className="flex items-center">
        <NavLink to="/">
          <img src={Logo} className="w-100 mr-2 h-10" alt="Logo" />
        </NavLink>
      </div>
      <div className="block text-primary-600 lg:hidden">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="text-black-500 hover:text-black-400 flex items-center rounded-lg border border-primary-300 p-1"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="h-8 w-8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>
      </div>
      <div
        onClick={() => setIsOpen(!isOpen)}
        className={`absolute right-4 top-16 justify-between max-lg:mt-4 lg:static lg:flex lg:w-full lg:items-center ${
          isOpen ? 'block' : 'hidden'
        }`}
      >
        <ul className="m-2 flex gap-1 rounded-xl text-primary-700 max-lg:flex-col max-lg:border max-lg:border-primary-300 max-lg:bg-white max-lg:px-6 max-lg:py-4 lg:gap-8">
          <li>
            <NavLink to="/" className="block rounded-xl px-6 py-3 lg:px-2">
              Beranda
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/package"
              className="block rounded-xl px-6 py-3 lg:px-2"
            >
              Paket Wisata
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/history"
              className="block rounded-xl px-6 py-3 lg:px-2"
            >
              Riwayat
            </NavLink>
          </li>
          <div className="flex flex-col md:hidden">
            <NavLink to="/login">
              <Button variant="text" className="">
                Masuk
              </Button>
            </NavLink>
            <NavLink to="/register">
              <Button variant="text" className="font-semibold">
                Buat Akun
              </Button>
            </NavLink>
          </div>
        </ul>
        <div className="flex flex-row gap-2 max-md:hidden">
          <NavLink to="/login">
            <Button variant="primary">Masuk</Button>
          </NavLink>
          <NavLink to="/register">
            <Button variant="secondary">Buat Akun</Button>
          </NavLink>
        </div>
      </div>
    </nav>
  )
}