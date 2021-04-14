import { Badge } from '@chakra-ui/layout';
import { IconGithub, IconLaunch, ImgDummy } from 'assets';
import clsx from 'clsx';
import { List } from 'components';
import Image from 'next/image';

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
  const primaryImage = images.find(({ isPrimary }) => isPrimary) || images[0];

  return (
    <div
      style={{ gridTemplateColumns: 'minmax(auto, 485px) 1fr' }}
      className={clsx('grid gap-x-20', className)}
    >
      <div className="max-w-[485px] relative">
        <Image
          src={primaryImage ? `http://filestream:4000/${primaryImage?.url}` : ImgDummy}
          layout="responsive"
          width={16}
          height={9}
        />
      </div>
      <div>
        <div className="flex items-center">
          <h4 className="text-h4 text-black font-semibold mr-3">{name}</h4>
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
  );
};

export default FeaturedProject;
