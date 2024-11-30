import { FC, useId } from "react";
import { BooleanObjectProp } from "../common/object-props";

export const BooleanSetting: FC<
  {
    setting: BooleanObjectProp;
    setBoolean: (id: string, value: boolean) => void;
  }
> = ({ setting, setBoolean }) => {
  const id = useId();
  return (
    <div>
      <input
        id={id}
        type="checkbox"
        checked={setting.value}
        onChange={() => setBoolean(setting.id, !setting.value)}
      />
      <label htmlFor={id}>{setting.displayName}</label>
    </div>
  );
};
