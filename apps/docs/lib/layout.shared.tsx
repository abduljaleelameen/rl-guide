import { Brain } from 'lucide-react';
import type { BaseLayoutProps, LinkItemType } from 'fumadocs-ui/layouts/shared';

export const linkItems: LinkItemType[] = [];

export const logo = (
  <Brain className="size-5 text-purple-500" />
);

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: (
        <>
          {logo}
          <span className="font-medium">RL Guide</span>
        </>
      ),
    },
  };
}
