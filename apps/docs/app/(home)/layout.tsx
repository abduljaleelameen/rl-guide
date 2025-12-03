import { HomeLayout } from 'fumadocs-ui/layouts/home';
import { baseOptions } from '@/lib/layout.shared';
import { BookOpen } from 'lucide-react';

export default function Layout({ children }: LayoutProps<'/'>) {
  return (
    <HomeLayout
      {...baseOptions()}
      links={[
        {
          text: 'Documentation',
          url: '/docs/reinforcement-ai',
          icon: <BookOpen />,
        },
      ]}
      className="dark:bg-neutral-950 dark:[--color-fd-background:var(--color-neutral-950)] [--color-fd-primary:var(--color-purple-500)]"
    >
      {children}
    </HomeLayout>
  );
}
