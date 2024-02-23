import { FC } from "react";
import {
  IconUpload,
  IconFileStack,
  IconDeviceDesktopAnalytics,
} from "@tabler/icons-react";
import NavItem from "components/Navbar/NavItem";

import {
  AGENT_PAGE,
  BEIDOU_PAGE,
  GLONASS_PAGE,
  GPS_PAGE,
  UPLOAD_BRDC,
} from "routes/route.constant";

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
      children: [
        {
          icon: "",
          label: "GPS Brdc",
          link: GPS_PAGE,
        },
        {
          icon: "",
          label: "BEIDOU Brdc",
          link: BEIDOU_PAGE,
        },
        {
          icon: "",
          label: "GLONASS Brdc",
          link: GLONASS_PAGE,
        },
      ],
    },
    {
      icon: <IconDeviceDesktopAnalytics />,
      label: "Danh sách trạm thu",
      link: AGENT_PAGE,
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
