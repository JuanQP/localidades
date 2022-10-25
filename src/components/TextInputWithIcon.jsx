import { ActionIcon, TextInput, Tooltip } from "@mantine/core";
import { IconArrowsShuffle } from "@tabler/icons";

export function TextInputWithIcon({ onRandomize, ...props }) {
  return (
    <TextInput
      withAsterisk
      { ...props }
      rightSection={(
        <Tooltip label="Elegir al azar">
          <ActionIcon onClick={onRandomize}>
            <IconArrowsShuffle size={18} />
          </ActionIcon>
        </Tooltip>
      )}
    />
  )
}
