import "./App.css";
import { SvgDrawer } from "./drawers/SvgDrawer";
import { FC, useContext } from "react";
import { RoomStoreContext } from "./store/store";
import { SettingsViewer } from "./settings/SettingsViewer";
import { observer } from "mobx-react-lite";
import { HistoryControl } from "./history/HistoryControl";

export const App: FC = observer(() => {
  const store = useContext(RoomStoreContext);
  return (
    <div style={{ padding: "20px", display: "flex" }}>
      <SvgDrawer styledShapes={store.styledShapes} text={store.text} />
      <div>
        <SettingsViewer store={store} />
        <HistoryControl store={store} />
      </div>
    </div>
  );
});
