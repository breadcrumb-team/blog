import React from "react";

type AnchorProps = React.AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
};

export default function Link(props: AnchorProps) {
  const { href, children, ...rest } = props;
  return (
    <a href={href} {...rest}>
      {children}
    </a>
  );
}


