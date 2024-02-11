import LogoDark from "../../assets/images/logos/xtremelogo.svg";
import Image from "next/image";
import Link from "next/link";

const Logo = () => {
  return (
    <Link href="/">
      <a>
        <img src={`/liv-hospital2359.jpg`} width={150} alt="logo" />
      </a>
    </Link>
  );
};

export default Logo;
