import * as React from "react"

interface CheckBoxProps {
  text?: string
  checked?: boolean
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onEnabled?: (event: React.ChangeEvent<HTMLInputElement>) => void
  onDisabled?: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export const Checkbox = ({
  text,
  checked,
  onChange,
  onEnabled,
  onDisabled,
}: CheckBoxProps) => {
  const [_checked, setChecked] = React.useState(checked || false)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!_checked) {
      onEnabled && onEnabled(event)
    } else {
      onDisabled && onDisabled(event)
    }
    onChange && onChange(event)
    setChecked(!_checked)
  }

  return (
    <label>
      <input
        type="checkbox"
        checked={_checked}
        onChange={(event) => handleChange(event)}
      />
      {text}
    </label>
  )
}
