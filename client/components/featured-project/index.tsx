import { Badge } from '@chakra-ui/layout';
import { IconGithub, IconLaunch, ImgDummy } from 'assets';
import clsx from 'clsx';
import { List } from 'components';
import Image from 'next/image';
import { useState } from 'react';
import Lightbox from 'react-image-lightbox';
import styles from './featured-project.module.css';

interface FeaturedProjectProps extends Project {
  className?: string;
}

const FeaturedProject: React.FC<FeaturedProjectProps> = ({
  className,
  achievements,
  builtWith,
  description,
  images,
  name,
  year,
  isOnGoing,
  links,
  role,
}) => {
  const [showAllImages, setShowAllImages] = useState<boolean>(false);
  const primaryImage = images.find(({ isPrimary }) => isPrimary) || images[0];
  const [photoIndex, setPhotoIndex] = useState<number>(images.indexOf(primaryImage));

  return (
    <>
      {showAllImages && (
        <Lightbox
          enableZoom
          mainSrc={'/filestream/' + images[photoIndex]?.url}
          nextSrc={'/filestream/' + images[(photoIndex + 1) % images.length]?.url}
          prevSrc={'/filestream/' + images[(photoIndex + images.length - 1) % images.length]?.url}
          onMovePrevRequest={() => setPhotoIndex((photoIndex + 1) % images.length)}
          onMoveNextRequest={() => setPhotoIndex((photoIndex + images.length - 1) % images.length)}
          onCloseRequest={() => setShowAllImages(false)}
        />
      )}
      <div
        style={{ gridTemplateColumns: 'minmax(auto, 485px) 1fr' }}
        className={clsx('lg:grid gap-x-20', className)}
      >
        <div className="mb-5 lg:mb-0">
          <div
            onClick={() => setShowAllImages(true)}
            className="max-w-[485px] group cursor-pointer relative relative overflow-hidden"
          >
            <Image
              src={primaryImage ? `http://filestream:4000/${primaryImage?.url}` : ImgDummy}
              layout="responsive"
              width={16}
              height={9}
            />
            <div className="bg-black bg-opacity-50 absolute top-0 left-0 w-full h-full transform transition-all duration-500 translate-y-full group-hover:translate-y-0 flex items-center justify-center text-h5 text-white">
              See All Images
            </div>
          </div>
          <button
            onClick={() => setShowAllImages(true)}
            className={clsx('underline focus:outline-none mt-2 text-grey-1', styles.hover)}
          >
            See All Images
          </button>
        </div>
        <div>
          <div className="flex md:flex-row flex-col md:items-center">
            <div className="flex items-center mb-2 md:mb-0">
              <h4 className="md:text-h4 text-h5 text-black font-semibold mr-3">{name}</h4>
              <Badge
                marginRight="4"
                paddingX="2"
                fontWeight="normal"
                rounded="xl"
                textColor="white"
                bgColor="blue"
              >
                {isOnGoing ? 'Ongoing' : year}
              </Badge>
            </div>
            <div className="flex items-center mb-2 md:mb-0">
              {links?.map(({ type, link, id }) => {
                return (
                  <a
                    key={id}
                    className="mr-3 last:mr-0"
                    href={link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {type === 'github' ? <IconGithub /> : <IconLaunch />}
                  </a>
                );
              })}
            </div>
          </div>
          <h6 className="text-body text-grey-1 mb-4">{role}</h6>
          <div className="flex items-center mb-4">
            {builtWith?.map((tech) => (
              <Badge
                key={tech}
                variant="outline"
                paddingX="3"
                fontWeight="normal"
                rounded="xl"
                textColor="grey.1"
                borderColor="grey.1"
                className="mr-2.5 last:mr-0"
              >
                {tech}
              </Badge>
            ))}
          </div>
          <p className="text-black">{description}</p>
          <div className="mt-3">
            {achievements?.map((achievement) => (
              <List key={achievement} size="sm">
                {achievement}
              </List>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedProject;
