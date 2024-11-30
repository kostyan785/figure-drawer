import { FC, useId } from "react";
import { NumberObjectProp } from "../common/object-props";

export const NumberSetting: FC<
  {
    setting: NumberObjectProp;
    setNumber: (id: string, value: number) => void;
  }
> = ({ setting, setNumber }) => {
  const id = useId();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setNumber(setting.id, parseInt(event.target.value));
  };
  return (
    <div>
      <label htmlFor={id}>{setting.displayName}</label>
      <input
        type="range"
        max={setting.max}
        min={setting.min}
        value={setting.value}
        onChange={handleChange}
      />
    </div>
  );
};
