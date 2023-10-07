import Image from "next/image";
import Link from "next/link";

export const Logo = ({ asLink = false }: { asLink?: boolean }) => {
  if (!asLink)
    return (
      <Image
        priority
        alt="logo"
        src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
        height={32}
        width={32}
        className="h-9 w-auto"
      />
    );

  return (
    <Link href={"/events"}>
      <Image
        priority
        alt="logo"
        src="https://www.adaptivewfs.com/wp-content/uploads/2020/07/logo-placeholder-image.png"
        height={32}
        width={32}
        className="h-9 w-auto"
      />
    </Link>
  );
};

