import { FC } from "react";
import { BooleanObjectProp, NumberObjectProp } from "./../common/object-props";
import { IRootStore } from "../store/store";
import { BooleanSetting } from "./BooleanSetting";
import { NumberSetting } from "./NumberSetting";

export const SettingsViewer: FC<{ store: IRootStore }> = ({ store }) => {
  return (
    <div>
      {store.settings.map((st) => {
        if (BooleanObjectProp.isBoolean(st)) {
          return <BooleanSetting key={st.id} setting={st} setBoolean={store.setBoolean} />;
        } else if (NumberObjectProp.isNumber(st)) {
          return <NumberSetting key={st.id} setting={st} setNumber={store.setNumber} />;
        } else {
          throw new Error("Not implemented");
        }
      })}
    </div>
  );
};
