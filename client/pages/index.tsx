import { gql } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { client } from 'apollo-client';
import { IconCodeThinking, ImgMe } from 'assets';
import { Card, FeaturedProject, Footer, Navbar } from 'components';
import { motion, useAnimation } from 'framer-motion';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { InView } from 'react-intersection-observer';

const GET_PROJECTS = gql`
  query GetProjects {
    featuredProjects: projects(sortBy: year, sort: asc, filter: { isFeatured: true }) {
      id
      name
      description
      year
      madeAt
      role
      isFeatured
      isOnGoing
      builtWith
      achievements
      images {
        id
        url
        isPrimary
        alt
      }
      links {
        id
        type
        link
      }
    }

    normalProjects: projects(filter: { isFeatured: false, isArchive: false }) {
      id
      name
      description
      builtWith
      links {
        id
        type
        link
      }
    }
  }
`;

interface HomePageProps {
  featuredProjects: Project[];
  normalProjects: Project[];
}

export const getStaticProps: GetStaticProps<HomePageProps> = async (context) => {
  // ...
  const { data } = await client.query({
    query: GET_PROJECTS,
  });

  return {
    props: {
      featuredProjects: data.featuredProjects,
      normalProjects: data.normalProjects,
    },
    revalidate: 60,
  };
};

export default function Home({
  normalProjects,
  featuredProjects,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }));
  }, []);

  const variants = {
    initial: {
      opacity: 0,
      y: 40,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <>
      <Navbar />
      <main>
        <section id="hero" className="container mx-auto mt-60 px-6 md:px-10">
          <div className="grid grid-cols-5 items-center ">
            <div className="col-span-3">
              <motion.div
                custom={0}
                initial="initial"
                variants={variants}
                animate={controls}
                className="text-blue font-semibold"
              >
                Hi, my name is
              </motion.div>
              <motion.h1
                initial="initial"
                animate={controls}
                custom={1}
                variants={variants}
                className="text-h2 font-semibold mb-2"
              >
                Azhar Ali.
              </motion.h1>
              <motion.h2
                initial="initial"
                animate={controls}
                custom={2}
                variants={variants}
                className="text-grey-1 font-semibold text-h3 mb-6"
              >
                I help companies and organizations build beautiful and robust digital products with
                great UX.
              </motion.h2>
              <motion.div initial="initial" animate={controls} custom={3} variants={variants}>
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
              </motion.div>
            </div>
            <motion.div
              initial="initial"
              animate={controls}
              custom={5}
              variants={variants}
              className="col-span-2"
            >
              <IconCodeThinking className="w-full" />
            </motion.div>
          </div>
        </section>

        <section id="about" className="container mx-auto mt-40 mb-40 px-6 md:px-10">
          <InView triggerOnce threshold={0.25}>
            {({ ref, inView }) => (
              <motion.div
                variants={variants}
                initial="initial"
                animate={inView ? 'show' : undefined}
                transition={{ delay: 0.8, duration: 0.5 }}
                ref={ref}
                className="grid grid-cols-3 gap-x-20"
              >
                <div className="col-span-2 md:w-[80%]">
                  <h2 className="text-h3 font-semibold text-blue mb-2">About Me</h2>
                  <p className="text-black">
                    Hello! I’m Ali, a Front End Engineer based in Bandung, Indonesia.
                    <br />
                    <br />
                    I have a year experience as a freelancer Front End Engineer. Become freelancer
                    allow me to be involved in wide variaties projects, from individuals until
                    enterprise level project. I have specialization in building web app using React
                    library and tools or framework related to that library. Even though I’m a Front
                    End Engineer, I have experience too in Back End Development, such as building
                    REST API using Node.js or Golang.
                    <br />
                    <br />I love building robust software that has great user experience, that’s why
                    I love using Typescript and writing unit test in my development process as long
                    there is still enough time to do that. And here are a few technologies I’ve been
                    working recently:
                  </p>
                </div>
                <div className="relative">
                  <div className="w-[314px]">
                    <Image src={ImgMe} layout="responsive" width={1} height={1} />
                  </div>
                  <div className="absolute z-[-1] w-[314px] h-[314px] border-8 border-grey-1 top-6 left-6"></div>
                </div>
              </motion.div>
            )}
          </InView>
        </section>

        <section id="featured-projects" className="container mx-auto mb-40">
          <InView threshold={0.25} triggerOnce>
            {({ ref, inView }) => (
              <div ref={ref} className="px-6 md:px-10">
                <motion.h2
                  animate={inView ? 'show' : undefined}
                  variants={variants}
                  initial="initial"
                  transition={{ duration: 0.5 }}
                  className="text-h3 font-semibold text-blue mb-12"
                >
                  Featured Projects
                </motion.h2>
                {featuredProjects?.map(({ id, ...otherProps }, i) => (
                  <InView key={id} triggerOnce threshold={0.5}>
                    {({ inView, ref }) => (
                      <motion.div
                        ref={ref}
                        animate={inView ? 'show' : undefined}
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        initial="initial"
                        className="mb-20 last:mb-0"
                      >
                        <FeaturedProject {...otherProps} />
                      </motion.div>
                    )}
                  </InView>
                ))}
              </div>
            )}
          </InView>
        </section>

        <section id="tinkering" className="container mx-auto px-6 md:px-10">
          <InView triggerOnce threshold={0.5}>
            {({ ref, inView }) => (
              <div ref={ref}>
                <motion.h2
                  animate={inView ? 'show' : undefined}
                  variants={variants}
                  initial="initial"
                  className="text-h3 font-semibold text-blue text-center mb-4"
                >
                  Something I've Built
                </motion.h2>
                <motion.p
                  animate={inView ? 'show' : undefined}
                  transition={{ delay: 0.2 }}
                  variants={variants}
                  initial="initial"
                  className="text-black text-center max-w-[578px] mx-auto mb-16"
                >
                  Here are the lists of my personal project, either for learning some new
                  technologies or to create awesome thing. But mostly it’s for learning purposes.
                </motion.p>
              </div>
            )}
          </InView>

          <InView triggerOnce threshold={0.5}>
            {({ ref, inView }) => (
              <div ref={ref} className="grid grid-cols-3 gap-8 max-w-[1114px] mx-auto">
                {normalProjects?.map(({ id, ...otherProps }, i) => (
                  <motion.div
                    animate={inView ? 'show' : undefined}
                    transition={{ delay: 0.3 * i, duration: 0.3 }}
                    variants={variants}
                    initial="initial"
                    key={id}
                  >
                    <Card {...otherProps} />
                  </motion.div>
                ))}
              </div>
            )}
          </InView>

          <InView triggerOnce threshold={0.5}>
            {({ ref, inView }) => (
              <motion.div
                ref={ref}
                animate={inView ? 'show' : undefined}
                variants={variants}
                initial="initial"
                className="flex justify-center mt-16"
              >
                <Link href="/archive">
                  <a>
                    <Button
                      className="focus:outline-none hover:bg-opacity-20 hover:bg-blue"
                      variant="outline"
                      borderRadius="none"
                      textColor="blue"
                      borderColor="blue"
                      paddingX="8"
                    >
                      See All My Projects
                    </Button>
                  </a>
                </Link>
              </motion.div>
            )}
          </InView>
        </section>
        <InView triggerOnce threshold={0.5}>
          {({ ref, inView }) => (
            <motion.section
              animate={inView ? 'show' : undefined}
              variants={variants}
              initial="initial"
              transition={{ duration: 0.5 }}
              ref={ref}
              id="get-in-touch"
              className="container mx-auto px-6 md:px-10 mt-40"
            >
              <h2 className="text-h3 font-semibold text-blue text-center mb-4">Get in touch</h2>
              <p className="text-black text-center max-w-[664px] mx-auto mb-9">
                Currently I’m looking for new oppurtunities for fulltime job as Front End Engineer
                or Full Stack Engineer especially with company that offering remote job. If you have
                a question or just want to say hi, my inbox is always open. And I'll try my best to
                get back to you!
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
            </motion.section>
          )}
        </InView>
      </main>
      <Footer />
    </>
  );
}
