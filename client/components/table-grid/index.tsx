import { motion } from 'framer-motion';
import { InView } from 'react-intersection-observer';

type Column = {
  field?: string;
  width?: string;
  name?: string;
};

interface TableGridProps {
  data?: Record<string, any>[];
  columns?: Column[];
  onRenderField?: (field: string, value: any, ctx: { className: string; key: string }) => any;
  className?: string;
  config?: {
    textColorHead?: 'black' | 'grey-1' | 'grey-2' | 'blue';
    animationInView?: boolean;
  };
}

const TableGrid: React.FC<TableGridProps> = ({
  columns,
  data,
  className,
  config,
  onRenderField,
}) => {
  const gridTemplateColumns = columns
    ?.map(({ width }) => {
      if (!width) return 'minmax(auto, 1fr)';

      return width;
    })
    .join(' ');

  if (!config) config = {};

  const { textColorHead = 'black', animationInView = false } = config;

  const variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    show: {
      opacity: 1,
      y: 0,
    },
  };

  return (
    <div className={className}>
      <div style={{ gridTemplateColumns }} className="grid gap-x-6 py-4 items-center">
        {columns.map(({ name, field }) => {
          return (
            <div key={field} className={`text-${textColorHead} font-semibold`}>
              {name}
            </div>
          );
        })}
      </div>
      <div className="w-full">
        {data?.map((value, i) => {
          return (
            <InView threshold={0.5} key={`table-grid-${i}`}>
              {({ ref, inView }) => (
                <motion.div
                  animate={inView ? 'show' : 'initial'}
                  variants={animationInView ? variants : undefined}
                  initial="initial"
                  transition={{ duration: 0.2, delay: 0.2 * i }}
                  ref={ref}
                >
                  <div style={{ gridTemplateColumns }} className="grid gap-x-6 py-3 items-center">
                    {columns?.map(({ field }) => {
                      const key = `${field}-${value[field]}`;
                      const className = 'text-black';

                      const renderField = onRenderField
                        ? onRenderField(field, value[field], { key, className })
                        : undefined;

                      if (renderField) return renderField;

                      return <div key={key}>{value[field]}</div>;
                    })}
                  </div>
                </motion.div>
              )}
            </InView>
          );
        })}
      </div>
    </div>
  );
};

export default TableGrid;
