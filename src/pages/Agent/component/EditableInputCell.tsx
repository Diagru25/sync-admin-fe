/* eslint-disable react-refresh/only-export-components */
import { ActionIcon, TableTd, Text, Textarea } from "@mantine/core";
import { IconCheck, IconEdit } from "@tabler/icons-react";
import { FC, Fragment, memo, useRef, useState } from "react";

type Props = {
  value: string;
  onSave: (value: string) => void;
};
const EditableInputCell: FC<Props> = ({ value, onSave }) => {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const ref = useRef<HTMLTextAreaElement>(null);

  const handleSave = () => {
    onSave(ref.current?.value || "");
    setIsEdit(false);
  };

  return (
    <Fragment>
      <TableTd>
        {isEdit ? (
          <Textarea
            ref={ref}
            defaultValue={value}
            miw={300}
            maw={500}
            w="100%"
            placeholder="Autosize with no rows limit"
            autosize
            minRows={2}
          />
        ) : (
          <Text maw={500}>{value}</Text>
        )}
      </TableTd>
      <TableTd>
        <ActionIcon
          variant="filled"
          aria-label="Settings"
          color={isEdit ? "green" : ""}
        >
          {isEdit ? (
            <IconCheck
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
              onClick={handleSave}
            />
          ) : (
            <IconEdit
              style={{ width: "70%", height: "70%" }}
              stroke={1.5}
              onClick={() => setIsEdit(true)}
            />
          )}
        </ActionIcon>
      </TableTd>
    </Fragment>
  );
};

export default memo(EditableInputCell);
