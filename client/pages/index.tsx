import { gql } from '@apollo/client';
import { Button } from '@chakra-ui/button';
import { client } from 'apollo-client';
import { IconCodeThinking, ImgMe } from 'assets';
import { Card, FeaturedProject, Footer, List, Navbar } from 'components';
import { motion, useAnimation } from 'framer-motion';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import Head from 'next/head';
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

export const getServerSideProps: GetServerSideProps<HomePageProps> = async ({ res }) => {
  try {
    const { data } = await client({ ssrMode: true }).query({
      query: GET_PROJECTS,
      fetchPolicy: 'no-cache',
    });

    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');

    return {
      props: {
        featuredProjects: data.featuredProjects,
        normalProjects: data.normalProjects,
      },
    };
  } catch (e) {
    console.warn(e);

    return {
      props: {
        featuredProjects: [],
        normalProjects: [],
      },
    };
  }
};

export default function Home({
  normalProjects,
  featuredProjects,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const controls = useAnimation();

  useEffect(() => {
    controls.start((i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
      },
    }));
  }, [controls]);

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
      <Head>
        <title>Azhar Ali Fauzi | Front End Engineer</title>
        <meta
          name="description"
          content="Azhar Ali Fauzi is a Front End Engineer based on Indonesia who specialized building robust software with beautiful UI and great UX"
        />
        <meta property="og:title" content="Azhar Ali Fauzi | Front End Engineer" />
        <meta
          property="og:description"
          content="Azhar Ali Fauzi is a Front End Engineer based on Indonesia who specialized building robust software with beautiful UI and great UX"
        />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://azharalifauzi.dev/" />
        <meta property="og:image" content="https://azharalifauzi.dev/og-image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:creator" content="@azharalifauzi" />
        <meta name="twitter:title" content="Azhar Ali Fauzi | Front End Engineer" />
        <meta
          name="twitter:description"
          content="Azhar Ali Fauzi is a Front End Engineer based on Indonesia who specialized building robust software with beautiful UI and great UX"
        />
        <meta name="twitter:image" content="https://azharalifauzi.dev/og-image.png" />
        <meta name="robots" content="index, follow" />
      </Head>
      <Navbar />
      <main>
        <section id="hero" className="container mx-auto mt-40 md:mt-60 px-6 md:px-10">
          <div className="grid lg:grid-cols-5 items-center ">
            <div className="lg:col-span-3">
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
                className="md:text-h2 text-h3 font-semibold mb-2"
              >
                Azhar Ali.
              </motion.h1>
              <motion.h2
                initial="initial"
                animate={controls}
                custom={2}
                variants={variants}
                className="text-grey-1 font-semibold text-h4 md:text-h3 mb-6"
              >
                I help companies and organizations build beautiful and robust digital products with
                great UX.
              </motion.h2>
              <motion.div initial="initial" animate={controls} custom={3} variants={variants}>
                <a href="mailto:azharalifauzi@gmail.com">
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
                </a>
              </motion.div>
            </div>
            <motion.div
              initial="initial"
              animate={controls}
              custom={5}
              variants={variants}
              className="lg:col-span-2 lg:block hidden"
            >
              <IconCodeThinking className="w-full" />
            </motion.div>
          </div>
        </section>

        <section
          id="about"
          className="container mx-auto mt-28 md:mt-40 mb-16 md:mb-40 px-6 md:px-10"
        >
          <InView triggerOnce threshold={0.25}>
            {({ ref, inView }) => (
              <motion.div
                variants={variants}
                initial="initial"
                animate={inView ? 'show' : undefined}
                transition={{ duration: 0.5 }}
                ref={ref}
                className="grid lg:grid-cols-3 gap-x-20 gap-y-6"
              >
                <div className="lg:col-span-2 lg:w-[80%]">
                  <h2 className="md:text-h3 text-h4 font-semibold text-blue mb-2">About Me</h2>
                  <p className="text-black mb-3">
                    Hello! I’m Azhar, a Front End Engineer based in Bandung, Indonesia.
                    <br />
                    <br />
                    I have more than a year experience working as Front End Engineer, both full time
                    and freelance. Become freelancer and full-timer at the same time allow me to be
                    involved in wide varieties projects, from individuals until enterprise level
                    project. I have specialization in building web app using React library and tools
                    or framework related to that library. Even though I’m a Front End Engineer, I
                    have experience too in Back End Development, such as building REST API using
                    Node.js or Golang, or orchestrate apps using Docker or Kubernetes.
                    <br />
                    <br />I love to tinkering at the weekend, learning new things every week,
                    especially technologies that are currently a hot topics around the dev community
                    such as Golang, Rust, or Blockchain. And here are a few technologies I’ve been
                    working recently:
                  </p>
                  <div className="grid grid-cols-3 max-w-[315px] gap-x-3 sm:gap-x-12 gap-y-3">
                    <List color="grey-1" size="sm">
                      Typescript
                    </List>
                    <List color="grey-1" size="sm">
                      Express
                    </List>
                    <List color="grey-1" size="sm">
                      Docker
                    </List>
                    <List color="grey-1" size="sm">
                      React.js
                    </List>
                    <List color="grey-1" size="sm">
                      MongoDB
                    </List>
                    <List color="grey-1" size="sm">
                      GraphQL
                    </List>
                    <List color="grey-1" size="sm">
                      Golang
                    </List>
                    <List color="grey-1" size="sm">
                      Vue.js
                    </List>
                    <List color="grey-1" size="sm">
                      Postgresql
                    </List>
                  </div>
                </div>
                <div className="relative lg:row-auto row-start-1">
                  <div className="sm:w-[314px] w-full">
                    <Image src={ImgMe} layout="responsive" width={1} height={1} />
                  </div>
                  <div className="absolute z-[-1] w-[314px] h-[314px] border-8 border-grey-1 top-6 left-6 hidden lg:block"></div>
                </div>
              </motion.div>
            )}
          </InView>
        </section>

        <section id="featured-projects" className="container mx-auto mb-20 md:mb-40">
          <InView threshold={0.25} triggerOnce>
            {({ ref, inView }) => (
              <div ref={ref} className="px-6 md:px-10">
                <motion.h2
                  animate={inView ? 'show' : undefined}
                  variants={variants}
                  initial="initial"
                  transition={{ duration: 0.5 }}
                  className="md:text-h3 text-h4 font-semibold text-blue mb-12"
                >
                  Featured Projects
                </motion.h2>
                {featuredProjects?.map(({ id, ...otherProps }) => (
                  <InView key={id} triggerOnce threshold={0.5}>
                    {({ inView, ref }) => (
                      <motion.div
                        ref={ref}
                        animate={inView ? 'show' : undefined}
                        variants={variants}
                        transition={{ duration: 0.5 }}
                        initial="initial"
                        className="md:mb-20 mb-10 last:mb-0"
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
                  className="md:text-h3 text-h4 font-semibold text-blue text-center mb-4"
                >
                  Something I&apos;ve Built
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
              <div
                ref={ref}
                className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-[1114px] mx-auto"
              >
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
              className="container mx-auto px-6 md:px-10 md:mt-40 mt-20"
            >
              <h2 className="md:text-h3 text-h4 font-semibold text-blue text-center mb-4">
                Get in touch
              </h2>
              <p className="text-black text-center max-w-[664px] mx-auto mb-9">
                Currently I’m looking for new oppurtunities for fulltime job as Front End Engineer
                or Senior Front End Engineer especially with company that offering remote job. If
                you have a question or just want to say hi, my inbox is always open. And I&apos;ll
                try my best to get back to you!
              </p>
              <div className="flex justify-center">
                <a href="mailto:azharalifauzi@gmail.com">
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
                </a>
              </div>
            </motion.section>
          )}
        </InView>
      </main>
      <Footer />
    </>
  );
}
