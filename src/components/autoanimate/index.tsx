import { chakra } from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import { ElementType, HTMLAttributes } from 'react';

interface Props extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
}

const ReactAutoAnimate: React.FC<Props> = ({
  as: Tag = 'div',
  children,
  ...rest
}) => {
  const [ref] = useAutoAnimate<HTMLElement>();
  return (
    <Tag ref={ref} {...rest}>
      {children}
    </Tag>
  );
};

export const AutoAnimate = chakra(ReactAutoAnimate);

