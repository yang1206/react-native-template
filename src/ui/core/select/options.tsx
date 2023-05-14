import { BottomSheetFlatList, BottomSheetModal } from '@gorhom/bottom-sheet'
import * as React from 'react'
import type { PressableProps } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { renderBackdrop } from '../bottom-sheet'
import { Pressable } from '../pressable'
import { Text } from '../text'
import { useThemeStore } from '@/hooks'
import { colors } from '@/ui/theme'

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
      className="flex-row items-center border-b-[1px] border-neutral-300 bg-white py-2 px-3 dark:border-charcoal-700 dark:bg-charcoal-800"
      {...props}
    >
      <Text variant="md" className="flex-1 dark:text-charcoal-100">
        {label}
      </Text>
      {selected && <Ionicons color={isDark ? colors.white : colors.black} name="checkmark-outline" size={24} />}
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
        handleIndicatorStyle={{
          backgroundColor: isDark ? colors.white : colors.charcoal[800],
        }}
        backgroundStyle={{
          backgroundColor: isDark ? colors.charcoal[950] : colors.white,
        }}
      >
        <BottomSheetFlatList
          data={options}
          style={{
            backgroundColor: isDark ? colors.charcoal[950] : colors.white,
          }}
          keyExtractor={keyExtractor}
          renderItem={renderSelectItem}
        />
      </BottomSheetModal>
    )
  },
)

Options.displayName = 'Options'
