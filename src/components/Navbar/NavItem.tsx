import React, { FC, ReactElement, useState } from "react";
import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

interface ChildrenProps {
  label: string;
  link: string;
}

interface NavItemProps {
  icon: ReactElement;
  color: string;
  label: string;
  link: string;
  children: Array<ChildrenProps>;
  triggerBurger: () => void;
}

const NavItem: FC<NavItemProps> = (props) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isNavOpened, setIsNavOpened] = useState(false);

  const isActive = (link: string) => {
    return location.pathname === link ? true : false;
  };

  const isParentActive = () => {
    const tmpLinks = props.children.map((item) => item.link);
    if (tmpLinks.includes(location.pathname)) return true;
    return false;
  };

  const handleNavigate = (link: string) => {
    if (link) {
      props.triggerBurger();
      navigate(link);
    }
  };

  return props.children.length === 0 ? (
    <NavLink
      label={props.label}
      leftSection={React.cloneElement(props.icon, {
        ...props.icon.props,
        size: 20,
        stroke: isActive(props.link) ? 2 : 1.5,
      })}
      onClick={() => handleNavigate(props.link)}
      styles={(theme) => ({
        root: {
          borderLeft: isActive(props.link)
            ? `${theme.colors.blue[7]} solid 2px`
            : "none 1px",
          color: isActive(props.link) ? theme.colors.blue[8] : "black",
          backgroundColor: isActive(props.link)
            ? theme.colors.blue[0]
            : "transparent",
          fontWeight: isActive(props.link) ? "bold" : "normal",
        },
      })}
    />
  ) : (
    <NavLink
      label={props.label}
      leftSection={React.cloneElement(props.icon, {
        ...props.icon.props,
        size: 20,
        stroke: isNavOpened ? 2 : 1.5,
      })}
      opened={isNavOpened}
      onChange={(opened: boolean) => setIsNavOpened(opened)}
      styles={(theme) => ({
        root: {
          fontWeight: isNavOpened ? "bold" : "normal",
          color: isParentActive() ? theme.colors.blue[8] : "black",
        },
      })}
    >
      {props.children.map((item, index) => {
        return (
          <NavLink
            key={index}
            label={item.label}
            onClick={() => handleNavigate(item.link)}
            styles={(theme) => ({
              root: {
                paddingLeft: "20px",
                borderLeft: isActive(item.link)
                  ? `${theme.colors.blue[7]} solid 2px`
                  : `${theme.colors.gray[3]} solid 1px`,
                color: isActive(item.link) ? theme.colors.blue[8] : "black",
                backgroundColor: isActive(item.link)
                  ? theme.colors.blue[0]
                  : "transparent",
                fontWeight: isActive(item.link) ? "bold" : "normal",
              },
            })}
          />
        );
      })}
    </NavLink>
  );
};

export default NavItem;
