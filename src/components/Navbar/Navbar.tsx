import { FC } from "react";
import {
  IconUpload,
  IconFileStack,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";
import NavItem from "components/Navbar/NavItem";

import { UPLOAD_BRDC } from "routes/route.constant";

type Props = {
  triggerBurger: () => void;
};
const NavbarCustom: FC<Props> = ({ triggerBurger }) => {
  const data = [
    {
      icon: <IconUpload />,
      label: "Upload Brdc",
      link: UPLOAD_BRDC,
      color: "",
      children: [],
    },
    {
      icon: <IconFileStack />,
      label: "File brdc",
      link: "",
      color: "",
      children: [],
    },
    {
      icon: <IconDeviceDesktopAnalytics />,
      label: "Danh sách trạm thu",
      link: "",
      color: "",
      children: [],
    },
  ];
  return (
    <div>
      {data.map((navItem, index) => (
        <NavItem key={index} {...navItem} triggerBurger={triggerBurger} />
      ))}
    </div>
  );
};

export default NavbarCustom;
