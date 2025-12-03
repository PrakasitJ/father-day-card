import Link from 'next/link';

interface WebLinkProps {
  href: string;
  children: React.ReactNode;
  className?: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
  rel?: string;
}

export function WebLink({
  href,
  children,
  className,
  target,
  rel
}: WebLinkProps) {
  const isExternal = href.startsWith('http://') || href.startsWith('https://');

  if (isExternal) {
    return (
      <a
        href={href}
        className={className}
        target={target || '_blank'}
        rel={rel || 'noopener noreferrer'}
      >
        {children}
      </a>
    );
  } else {
    return (
      <Link href={href} className={className} target={target} rel={rel}>
        {children}
      </Link>
    );
  }
}