import { Title } from "@mantine/core";
import FileList from "components/FileList";
import { Fragment } from "react";

const FileBeidou = () => {
  return (
    <Fragment>
      <Title order={3}>Danh sách file brdc BEIDOU</Title>
      <FileList type="BEIDOU" />
    </Fragment>
  );
};

export default FileBeidou;
