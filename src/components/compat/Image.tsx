import React from "react";

type ImageProps = React.ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export default function Image(props: ImageProps) {
  const { src, alt, width, height, className, priority, loading, ...rest } = props;
  // Ensure public asset base path works with configured base (e.g., /blog/)
  const rawBase = import.meta.env.BASE_URL || "/";
  // Guarantee exactly one trailing slash on base
  const base = rawBase.endsWith("/") ? rawBase : `${rawBase}/`;
  // Guarantee no leading slash on src before join
  const normalized = typeof src === "string" && src.startsWith("/")
    ? `${base}${src.slice(1)}`
    : src.startsWith("./")
      ? `${base}${src.slice(2)}`
      : src;

  return (
    <img
      src={normalized}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={priority ? "eager" : loading}
      {...rest}
    />
  );
}


