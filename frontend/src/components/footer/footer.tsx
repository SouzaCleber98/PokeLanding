import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className='bg-yellow-300 border-t-2 border-t-yellow-400'>
      <div className='flex  items-center justify-between p-6 md:p-10'>
        <div>
          <p className='text-sm font-light'>
            This project uses{' '}
            <Link
              className='text-red-600 font-semibold hover:text-gray-950'
              href='https://pokeapi.co/'
            >
              PokéAPI
            </Link>
          </p>
        </div>

        <address className='flex gap-4'>
          <Link
            href='https://github.com/SouzaCleber98'
            target='_blank'
            className=' hover:text-white hover:scale-125 duration-300'
          >
            <FontAwesomeIcon className='text-2xl' icon={faGithub} />
          </Link>

          <Link
            href='https://www.linkedin.com/in/cleber-souza-62170b270/'
            target='_blank'
            className='hover:text-blue-700 hover:scale-125 duration-300'
          >
            <FontAwesomeIcon className='text-2xl' icon={faLinkedin} />
          </Link>
        </address>
      </div>

      <div className='bg-yellow-400 text-center p-3 md:p-6 text-sm text-gray-800'>
        <p className='text-sm font-light'>
          Feito por{' '}
          <Link
            href='https://github.com/SouzaCleber98'
            target='_blank'
            className='font-semibold hover:text-gray-950'
          >
            Cleber Souza
          </Link>
        </p>
      </div>
    </footer>
  );
}
