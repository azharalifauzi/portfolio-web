import { Button } from '@chakra-ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { LogoHeader } from 'assets';
import clsx from 'clsx';
import Link from 'next/link';
import { useState } from 'react';
import styles from './navbar.module.css';

const Navbar = () => {
  const [show, setShow] = useState<boolean>(false);

  const variants = {
    initial: {
      x: 280,
    },
    show: {
      x: 0,
    },
  };

  return (
    <header className="bg-black fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto py-4 px-6 md:px-10 flex justify-between items-center">
        <Link href="/">
          <a>
            <LogoHeader />
          </a>
        </Link>
        <button
          onClick={() => setShow(!show)}
          className="relative sm:hidden z-40 w-12 h-12 flex justify-center items-center focus:outline-none focus:border border-white border-dashed"
        >
          <div
            className={clsx(styles.hamburger, {
              [styles.active]: show,
            })}
          />
        </button>
        <AnimatePresence exitBeforeEnter>
          {show && (
            <motion.div
              variants={variants}
              initial="initial"
              animate="show"
              exit="initial"
              transition={{ duration: 0.3 }}
              className="fixed flex flex-col items-center justify-center top-0 right-0 h-full w-[280px] bg-black z-30"
            >
              <Link href="/">
                <a className="text-white font-semibold hover:text-blue mb-8">Home</a>
              </Link>
              <Link href="/">
                <a className="text-white font-semibold hover:text-blue mb-8">Blog</a>
              </Link>
              <Link href="/archive">
                <a className="text-white font-semibold hover:text-blue mb-8">Archive</a>
              </Link>
              <Button
                variant="outline"
                className="border-[#2B98FD] text-[#2B98FD] hover:bg-[#2B98FD] hover:bg-opacity-20"
                borderWidth={2}
              >
                Resume
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="sm:grid grid-flow-col auto-grid-max gap-x-12 items-center hidden">
          <Link href="/">
            <a className="text-white font-semibold hover:text-blue">Blog</a>
          </Link>
          <Link href="/archive">
            <a className="text-white font-semibold hover:text-blue">Archive</a>
          </Link>
          <Button
            variant="outline"
            className="border-[#2B98FD] text-[#2B98FD] hover:bg-[#2B98FD] hover:bg-opacity-20"
            borderWidth={2}
          >
            Resume
          </Button>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
