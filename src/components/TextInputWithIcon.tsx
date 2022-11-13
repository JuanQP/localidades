import { ActionIcon, TextInput, TextInputProps, Tooltip } from "@mantine/core";
import { IconArrowsShuffle } from "@tabler/icons";

interface Props extends TextInputProps {
  onRandomize: () => void;
}

export function TextInputWithIcon({ onRandomize, ...props }: Props) {
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
