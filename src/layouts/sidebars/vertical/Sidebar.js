import { Button, Nav, NavItem } from "reactstrap";
import Logo from "../../logo/Logo";
import Link from "next/link";
import { useRouter } from "next/router";



const Sidebar = ({ showMobilemenu, currentUser }) => {
  let curl = useRouter();
  const location = curl.pathname;
  let navigation;
  if(currentUser?.role === 'admin'){
    navigation = [
      {
        title: "Dashboard",
        href: "/",
        icon: "bi bi-sticky",
      },
      {
        title: "Hospitals",
        href: "/ui/hospital",
        icon: "bi bi-clock-history",
      },
      {
        title: "Customers",
        href: "/ui/customers",
        icon: "bi bi-person-square",
      },
      {
        title: "Insurance Plans",
        href: "/ui/plans",
        icon: "bi bi-currency-dollar",
      },
      {
        title: "Insurance",
        href: "/ui/insurance",
        icon: "bi bi-cast",
      }
    ]
  }
  return (
    <div className="p-3">
      <div className="d-flex align-items-center">
        <Logo />
        <Button
          close
          size="sm"
          className="ms-auto d-lg-none"
          onClick={showMobilemenu}
        ></Button>
      </div>
      <div className="pt-4 mt-2">
        <Nav vertical className="sidebarNav">
          {navigation?.map((navi, index) => (
            <NavItem key={index} className="sidenav-bg">
              <Link href={navi.href}>
                <a
                  className={
                    location === navi.href
                      ? "text-primary nav-link py-3"
                      : "nav-link text-secondary py-3"
                  }
                >
                  <i className={navi.icon}></i>
                  <span className="ms-3 d-inline-block">{navi.title}</span>
                </a>
              </Link>
            </NavItem>
          ))}
         
         
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
