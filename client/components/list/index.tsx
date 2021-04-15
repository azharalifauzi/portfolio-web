import { IconTriangle } from 'assets';
import clsx from 'clsx';

interface ListProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  color?: 'black' | 'grey-1' | 'blue' | 'grey-2' | 'white';
}

const List: React.FC<ListProps> = ({ className, children, size = 'md', color = 'black' }) => {
  return (
    <div className={clsx('flex items-center', className)}>
      <IconTriangle className="mr-2.5 min-w-[6px]" />
      <span
        className={clsx(`text-${color}`, {
          'text-body': size === 'md',
          'text-body-sm': size === 'sm',
          'text-h5': size === 'lg',
        })}
      >
        {children}
      </span>
    </div>
  );
};

export default List;
