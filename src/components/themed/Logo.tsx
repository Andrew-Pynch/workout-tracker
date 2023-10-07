
import Image from "next/image";
import Link from "next/link";

export const Logo = ({ asLink = false }: { asLink?: boolean }) => {
  if (!asLink)
    return (
      <Image
        priority
        alt="logo"
        src="/logo.svg"
        height={100}
        width={100}
        className="h-9 w-auto"
      />
    );

  return (
    <Link href={"/"}>
      <Image
        priority
        alt="logo"
        src="/logo.svg"
        height={100}
        width={100}
        className="h-9 w-auto"
      />
    </Link>
  );
};
