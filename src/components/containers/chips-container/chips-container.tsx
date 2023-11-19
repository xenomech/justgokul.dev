import { PROJECTS } from '@/assets/store';
import { Chips } from '@/components/chips';
import { cn } from '@/lib/common/utils';

interface ChipsContainerProps {
  className?: string;
}
export const ChipsContainer = ({ className }: ChipsContainerProps) => {
  return (
    <div className={cn(className)}>
      {PROJECTS.map((item) => (
        <Chips key={item.title} title={item.title} url={item.url} />
      ))}
    </div>
  );
};
