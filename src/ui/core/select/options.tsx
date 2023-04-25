import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import * as React from 'react'
import type { PressableProps } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { renderBackdrop } from '../bottom-sheet'
import { Pressable } from '../pressable'
import { Text } from '../text'
import { useThemeStore } from '@/hooks'

export type IOption = { label: string; value: string | number }

type OptionsProps = {
  options: IOption[]
  onSelect: (option: IOption) => void
  value?: string | number
}

function keyExtractor(item: IOption) {
  return `select-item-${item.value}`
}

function Option({
  label,
  selected = false,
  ...props
}: PressableProps & { selected?: boolean; label: string }) {
  const { isDark } = useThemeStore()
  return (
    <Pressable
      className="flex-row items-center border-b-[1px] border-neutral-300 py-2 px-3"
      {...props}
    >
      <Text variant="md" className="flex-1 text-black  dark:text-white">
        {label}
      </Text>
      {selected && <Ionicons color={isDark ? 'white' : 'black'} name="checkmark-outline" size={24} />}
    </Pressable>
  )
}
export const Options = React.forwardRef<BottomSheetModal, OptionsProps>(
  ({ options, onSelect, value }, ref) => {
    const height = options.length * 70 + 100
    const snapPoints = React.useMemo(() => [height], [height])
    const renderSelectItem = React.useCallback(
      ({ item }: { item: IOption }) => (
        <Option
          key={`select-item-${item.value}`}
          label={item.label}
          selected={value === item.value}
          onPress={() => onSelect(item)}
        />
      ),
      [onSelect, value],
    )
    const { isDark } = useThemeStore()

    return (
      <BottomSheetModal
        ref={ref}
        index={0}
        snapPoints={snapPoints}
        backdropComponent={renderBackdrop}
        handleStyle={{ backgroundColor: isDark ? '#333' : 'white' }}
        style={{ backgroundColor: isDark ? 'black' : '' }}
      >
        <BottomSheetFlatList
          data={options}
          style={{ backgroundColor: isDark ? 'black' : '' }}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
        />
      </BottomSheetModal>
    )
  },
)

Options.displayName = 'Options'
