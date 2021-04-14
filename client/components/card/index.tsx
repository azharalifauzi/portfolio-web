import { AspectRatio } from '@chakra-ui/layout';
import { IconFolder, IconGithub, IconLaunch } from 'assets';

interface CardProps extends Project {
  className?: string;
}

const Card: React.FC<CardProps> = ({ className, name, description, builtWith, links }) => {
  return (
    <AspectRatio className={className} background="grey.2" ratio={1}>
      <div className="flex flex-col justify-start items-strech px-6 py-4">
        <div className="flex items-center justify-between  w-full">
          <IconFolder />
          <div className="flex items-center">
            {links?.map(({ id, link, type }) => (
              <a
                key={id}
                className="mr-3 last:mr-0"
                href={link}
                target="_blank"
                rel="noopener noreferrer"
              >
                {type === 'github' ? <IconGithub /> : <IconLaunch />}
              </a>
            ))}
          </div>
        </div>
        <h5 className="text-h5 font-semibold text-black mt-6 mb-3">{name}</h5>
        <p className="text-black">{description}</p>
        <div className="mt-auto grid gap-2.5 auto-cols-max w-full grid-flow-col">
          {builtWith?.map((tech) => (
            <span key={tech} className="text-body-sm text-grey-1">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </AspectRatio>
  );
};

export default Card;
