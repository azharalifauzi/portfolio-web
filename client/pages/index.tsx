import { useQuery, gql } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { IconCodeThinking, IconGithub, IconGitlab, IconLinkedin, ImgMe } from 'assets';
import { useState } from 'react';
import Image from 'next/image';
import { Card, FeaturedProject } from 'components';

const GET_PROJECTS = gql`
  query GetProjects($isFeatured: Boolean) {
    projects(sortBy: year, sort: asc, filter: { isFeatured: $isFeatured }) {
      id
      name
      year
      madeAt
      isFeatured
      isOnGoing
      images {
        id
        url
        isPrimary
        alt
      }
      links {
        type
        link
      }
    }
  }
`;

export default function Home() {
  const [isFeatured, setFeatured] = useState<boolean>(false);
  const { data } = useQuery(GET_PROJECTS, {
    variables: {
      isFeatured,
    },
  });

  return (
    <>
      <main>
        <section id="hero" className="container mx-auto mt-40 px-6 md:px-10">
          <div className="grid grid-cols-5 items-center ">
            <div className="col-span-3">
              <div className="text-blue font-semibold">Hi, my name is</div>
              <h1 className="text-h2 font-semibold mb-2">Azhar Ali.</h1>
              <h2 className="text-grey-1 font-semibold text-h3 mb-6">
                I help companies and organizations build beautiful and robust digital products with
                great UX.
              </h2>
              <Button
                className="focus:outline-none"
                borderRadius="none"
                _hover={{
                  background: 'blue',
                }}
                _active={{
                  background: 'blue',
                }}
                textColor="white"
                bg="blue"
                paddingX="8"
              >
                Get in touch
              </Button>
            </div>
            <div className="col-span-2">
              <IconCodeThinking className="w-full" />
            </div>
          </div>
        </section>

        <section id="about" className="container mx-auto mt-40 mb-24 px-6 md:px-10">
          <div className="grid grid-cols-3 gap-x-20">
            <div className="col-span-2 md:w-[80%]">
              <h2 className="text-h3 font-semibold text-blue mb-2">About Me</h2>
              <p className="text-black">
                Hello! I’m Ali, a Front End Engineer based in Bandung, Indonesia.
                <br />
                <br />
                I have a year experience as a freelancer Front End Engineer. Become freelancer allow
                me to be involved in wide variaties projects, from individuals until enterprise
                level project. I have specialization in building web app using React library and
                tools or framework related to that library. Even though I’m a Front End Engineer, I
                have experience too in Back End Development, such as building REST API using Node.js
                or Golang.
                <br />
                <br />I love building robust software that has great user experience, that’s why I
                love using Typescript and writing unit test in my development process as long there
                is still enough time to do that. And here are a few technologies I’ve been working
                recently:
              </p>
            </div>
            <div className="relative">
              <div className="w-[314px]">
                <Image src={ImgMe} layout="responsive" width={1} height={1} />
              </div>
              <div className="absolute z-[-1] w-[314px] h-[314px] border-8 border-grey-1 top-6 left-6"></div>
            </div>
          </div>
        </section>

        <section id="featured-projects" className="container mx-auto mb-20">
          <div className="px-6 md:px-10">
            <h2 className="text-h3 font-semibold text-blue mb-12">Featured Projects</h2>
            <FeaturedProject />
          </div>
        </section>

        <section id="tinkering" className="container mx-auto px-6 md:px-10">
          <h2 className="text-h3 font-semibold text-blue text-center mb-4">Something I've Built</h2>
          <p className="text-black text-center max-w-[578px] mx-auto mb-16">
            Here are the lists of my personal project, either for learning some new technologies or
            to create awesome thing. But mostly it’s for learning purposes.
          </p>
          <div className="grid grid-cols-3 gap-8 max-w-[1114px] mx-auto">
            <Card />
            <Card />
            <Card />
          </div>
        </section>

        <section id="get-in-touch" className="container mx-auto px-6 md:px-10 mt-24">
          <h2 className="text-h3 font-semibold text-blue text-center mb-4">Get in touch</h2>
          <p className="text-black text-center max-w-[664px] mx-auto mb-9">
            Currently I’m looking for new oppurtunities for fulltime job as Front End Engineer or
            Full Stack Engineer especially with company that offering remote job. If you have a
            question or just want to say hi, my inbox is always open. And I'll try my best to get
            back to you!
          </p>
          <div className="flex justify-center">
            <Button
              className="focus:outline-none"
              borderRadius="none"
              _hover={{
                background: 'blue',
              }}
              _active={{
                background: 'blue',
              }}
              textColor="white"
              bg="blue"
              paddingX="8"
            >
              Say Hello
            </Button>
          </div>
        </section>
      </main>
      <footer className="container mx-auto md:px-10 px-6 mb-10">
        <p className="text-grey-1 mt-16 text-center mb-4">Designed & Built by Azhar Ali</p>
        <div className="grid grid-cols-3 w-[120px] mx-auto gap-6">
          <a
            className="mr-3 last:mr-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGithub />
          </a>
          <a
            className="mr-3 last:mr-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconLinkedin />
          </a>
          <a
            className="mr-3 last:mr-0"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            <IconGitlab />
          </a>
        </div>
      </footer>
    </>
  );
}
