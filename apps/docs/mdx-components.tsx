import defaultMdxComponents from 'fumadocs-ui/mdx';
import * as FilesComponents from 'fumadocs-ui/components/files';
import * as TabsComponents from 'fumadocs-ui/components/tabs';
import type { MDXComponents } from 'mdx/types';
import { Accordion, Accordions } from 'fumadocs-ui/components/accordion';
import * as icons from 'lucide-react';
import type { ImgHTMLAttributes } from 'react';

// Custom image component that handles SVGs with regular img tags
// and uses Next.js Image for other formats
function CustomImage(props: ImgHTMLAttributes<HTMLImageElement>) {
  const { src, alt, ...rest } = props;

  // Use regular img tag for SVGs (Next.js Image doesn't handle them well without width/height)
  if (typeof src === 'string' && src.endsWith('.svg')) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={alt || ''}
        className="rounded-lg w-full"
        {...rest}
      />
    );
  }

  // For non-SVG images, use the default fumadocs image component
  const DefaultImg = defaultMdxComponents.img;
  if (DefaultImg) {
    return <DefaultImg {...props} />;
  }

  // Fallback to regular img
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt || ''} className="rounded-lg" {...rest} />;
}

export function getMDXComponents(components?: MDXComponents) {
  return {
    ...(icons as unknown as MDXComponents),
    ...defaultMdxComponents,
    ...TabsComponents,
    ...FilesComponents,
    Accordion,
    Accordions,
    img: CustomImage,
    ...components,
  } satisfies MDXComponents;
}

declare module 'mdx/types.js' {
  // Augment the MDX types to make it understand React.
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    type Element = React.JSX.Element;
    type ElementClass = React.JSX.ElementClass;
    type ElementType = React.JSX.ElementType;
    type IntrinsicElements = React.JSX.IntrinsicElements;
  }
}

declare global {
  type MDXProvidedComponents = ReturnType<typeof getMDXComponents>;
}
