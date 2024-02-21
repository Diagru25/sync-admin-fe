import { Box } from "@mantine/core";
import { FC, Fragment } from "react";
import { Outlet } from "react-router-dom";

const ClientLayout: FC = () => {
  return (
    <Fragment>
      <Box>
        <Outlet />
      </Box>
    </Fragment>
  );
};

export default ClientLayout;
