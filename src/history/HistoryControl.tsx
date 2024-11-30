import { FC } from "react";
import { IRootStore } from "../store/store";
import { observer } from "mobx-react-lite";

export const HistoryControl: FC<{ store: IRootStore }> = observer(
  ({ store }) => {
    const hist = store.history;
    return (
      <div style={{ display: "flex" }}>
        <div style={{ flexGrow: 1 }}>
          <button
            disabled={!hist.backEnable}
            onClick={store.history.back}
          >
            &lt;-
          </button>
          <button
            disabled={!hist.forwardEnable}
            onClick={store.history.forward}
          >
            -&gt;
          </button>
        </div>
        <div style={{ flexGrow: 0 }}>
          <button disabled={!hist.applyEnable} onClick={store.history.reset}>Reset</button>
          <button
            disabled={!hist.applyEnable}
            onClick={store.history.apply}
          >
            Apply
          </button>
        </div>
      </div>
    );
  },
);
