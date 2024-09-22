'use client'
import {SiGithub} from '@icons-pack/react-simple-icons'


export function Footer() {

  return (
    <footer className="bg-transparent">
      <div className="container mx-auto flex justify-center items-center">
        <a
          href="https://github.com/slacerda85/btc-price-calc"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-500 hover:text-gray-100 transition-colors duration-300"
          aria-label="GitHub"
        >
          <SiGithub className="h-6 w-6" />
        </a>
      </div>
    </footer>
  )
}