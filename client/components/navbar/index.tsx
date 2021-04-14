import { Button } from '@chakra-ui/button';
import { LogoHeader } from 'assets';
import Link from 'next/link';

const Navbar = () => {
  return (
    <header className="bg-black fixed top-0 left-0 w-full z-50">
      <nav className="container mx-auto py-4 px-6 md:px-10 flex justify-between items-center">
        <Link href="/">
          <a>
            <LogoHeader />
          </a>
        </Link>
        <div className="grid grid-flow-col auto-grid-max gap-x-12 items-center">
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
