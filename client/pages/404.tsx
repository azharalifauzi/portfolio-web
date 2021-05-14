import { Button } from '@chakra-ui/button';
import { IconNotFound } from 'assets';
import Head from 'next/head';
import Link from 'next/link';

const NotFoundPage = () => {
  return (
    <>
      <Head>
        <title>Content Not Found :(</title>
      </Head>
      <div className="min-h-screen py-10 grid md:grid-cols-2 gap-x-12 gap-y-6 items-center container mx-auto px-6 md:px-10">
        <IconNotFound className="md:mb-0 mb-4 max-h-[300px] md:max-h-[400px] w-auto md:justify-self-end justify-self-center md:self-auto self-end" />
        <div className="flex flex-col items-center md:items-start self-start md:self-auto">
          <div className="text-black text-h5 md:text-h4 lg:text-h3 font-semibold mb-6 md:text-left text-center w-[85%] md:w-[70%]">
            Oops! It seems page you are looking for doesn&apos;t exist
          </div>
          <Link href="/">
            <a>
              <Button
                className="focus:outline-none"
                _hover={{
                  background: 'blue',
                }}
                _active={{
                  background: 'blue',
                }}
                bg="blue"
                color="white"
              >
                Back to Home
              </Button>
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
