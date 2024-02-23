import { FC, Fragment } from "react";
type Props = {
  files: string[];
};
const FileList: FC<Props> = ({ files }) => {
  return (
    <Fragment>
      {files.map((el) => (
        <div>{el}</div>
      ))}
    </Fragment>
  );
};

export default FileList;
