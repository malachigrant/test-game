import { GameState } from "@/types/GameState";
import { LayoutItemRenderer } from "./LayoutItemRenderer";
import { useCallback, useState } from "react";

interface SceneRendererProps {
  gameState: GameState;
}

export function SceneRenderer(props: SceneRendererProps) {
  const {
    gameState: { layout, state },
  } = props;

  const [stateVars, setStateVars] = useState(state);

  return (
    <div>
      {Object.values(layout).map((layoutItem) => {
        return (
          <LayoutItemRenderer
            key={layoutItem.id}
            data={layoutItem}
            state={stateVars}
            setState={setStateVars}
          />
        );
      })}
    </div>
  );
}
