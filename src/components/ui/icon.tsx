import { IconName } from "@/src/lib/constants/icons";
import { cn } from "@/src/lib/utils/utils";
import Image from "next/image";

interface IconProps
  extends Omit<React.ImgHTMLAttributes<HTMLImageElement>, "src"> {
  src?: string;
  name?: IconName;
  alt: string;
  size?: number;
  className?: string;
  width?: number;
  height?: number;
}

export default function Icon({
    size = 24,
    className,
    name,
    alt,
    width = size,
    height = size,
    src,
    ...props
}: IconProps) {
    const imageSrc = src || (name ? `/images/icons/${name}.svg` : "");
    if (!imageSrc) {
    return null;
  }
  const mergedClassName = cn(className);
  return (
    <Image 
      src={imageSrc}
      alt={alt || "icon"}
      width={width}
      height={height}
      className={mergedClassName}
      {...props}
    />
  ); 
}