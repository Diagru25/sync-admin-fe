/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactElement, useCallback, useState } from "react";
import { NavLink } from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";

interface ChildrenProps {
  label: string;
  link: string;
  children?: Array<ChildrenProps>;
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
  const [isNavOpened, setIsNavOpened] = useState({
    level_1: false,
    level_2: false,
  });

  const isActive = useCallback(
    (link: string) => {
      return location.pathname === link ||
        location.pathname + location.search === link
        ? true
        : false;
    },
    [location.pathname, location.search]
  );

  const isParentActive = (dataParent: any) => {
    const tmpLinks = dataParent.children.map((item: any) => item.link);
    if (
      tmpLinks.includes(location.pathname) ||
      tmpLinks.includes(location.pathname + location.search)
    ) {
      return true;
    }
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
          backgroundColor: isActive(props.link) ? theme.colors.blue[0] : "none",
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
        stroke: isNavOpened.level_1 ? 2 : 1.5,
      })}
      opened={isNavOpened.level_1}
      onChange={(opened: boolean) =>
        setIsNavOpened({ ...isNavOpened, level_1: opened })
      }
      styles={(theme) => ({
        root: {
          fontWeight: isNavOpened.level_1 ? "bold" : "normal",
          color: isParentActive(props) ? theme.colors.blue[8] : "black",
        },
      })}
    >
      {props.children.map((item, index) => {
        return (
          <NavLink
            key={index}
            label={item.label}
            opened={isNavOpened.level_2}
            onClick={() => (!item.children ? handleNavigate(item.link) : {})}
            onChange={(opened: boolean) =>
              setIsNavOpened({ ...isNavOpened, level_2: opened })
            }
            styles={(theme) =>
              !item.children
                ? {
                    root: {
                      paddingLeft: "16px",
                      borderLeft: isActive(item.link)
                        ? `${theme.colors.blue[7]} solid 2px`
                        : `${theme.colors.gray[3]} solid 1px`,
                      color: isActive(item.link)
                        ? theme.colors.blue[8]
                        : "black",
                      backgroundColor: isActive(item.link)
                        ? theme.colors.blue[0]
                        : "none",
                      fontWeight: isActive(item.link) ? "bold" : "normal",
                    },
                  }
                : {
                    root: {
                      borderLeft: isActive(item.link)
                        ? `${theme.colors.blue[7]} solid 2px`
                        : `${theme.colors.gray[3]} solid 1px`,
                      fontWeight: isNavOpened.level_2 ? "bold" : "normal",
                      color: isParentActive(item)
                        ? theme.colors.blue[8]
                        : "black",
                    },
                  }
            }
          >
            {item.children?.map((el, index) => {
              return (
                <NavLink
                  key={index}
                  label={el.label}
                  onClick={() => handleNavigate(el.link)}
                  styles={(theme) => ({
                    root: {
                      paddingLeft: "16px",
                      borderLeft: isActive(el.link)
                        ? `${theme.colors.blue[7]} solid 2px`
                        : `${theme.colors.gray[3]} solid 1px`,
                      color: isActive(el.link) ? theme.colors.blue[8] : "black",
                      backgroundColor: isActive(el.link)
                        ? theme.colors.blue[0]
                        : "none",
                      fontWeight: isActive(el.link) ? "bold" : "normal",
                    },
                  })}
                />
              );
            })}
          </NavLink>
        );
      })}
    </NavLink>
  );
};

export default NavItem;
