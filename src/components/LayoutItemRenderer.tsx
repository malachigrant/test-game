import { LayoutItem, LogicValue } from "@/types/GameState";
import { Textbox } from "./Textbox";
import { Button } from "./Button";

interface LayoutItemRendererProps {
  data: LayoutItem;
  state: Record<string, number>;
  setState: (
    fn: (oldState: Record<string, number>) => Record<string, number>
  ) => void;
}

function formatText(text: string, state: Record<string, number>): string {
  return text.replaceAll(/\{\{state::([a-zA-Z]+)\}\}/g, (_, x) =>
    state[x].toString()
  );
}

function getLogicValue(
  value: LogicValue,
  state: Record<string, number>
): number {
  if (typeof value === "number") {
    return value;
  }
  if ("operator" in value) {
    switch (value.operator) {
      case "+":
        return value.values.reduce<number>(
          (acc, curr) => acc + getLogicValue(curr, state),
          0
        );
      case "-":
        return (
          getLogicValue(value.values[0], state) -
          value.values
            .slice(1)
            .reduce<number>((acc, curr) => acc + getLogicValue(curr, state), 0)
        );
      case "*":
        return value.values.reduce<number>(
          (acc, curr) => acc * getLogicValue(curr, state),
          1
        );
      case "/":
        return (
          getLogicValue(value.values[0], state) /
          value.values
            .slice(1)
            .reduce<number>((acc, curr) => acc * getLogicValue(curr, state), 0)
        );
    }
  }
  if ("action" in value && value.action === "get") {
    return state[value.variable];
  }
  console.error("unsupported logic: ", value);
  return -1;
}

export function LayoutItemRenderer(props: LayoutItemRendererProps) {
  const {
    data: {
      type,
      text: preformattedText,
      position: { x, y },
      logic,
    },
    state,
    setState,
  } = props;

  const text = formatText(preformattedText, state);

  function runLogic() {
    logic?.forEach(({ action, variable, value }) => {
      if (action === "set") {
        setState((oldState: Record<string, number>) => {
          return { ...oldState, [variable]: getLogicValue(value, oldState) };
        });
      }
    });
  }

  const style = { top: y, left: x };

  switch (type) {
    case "textbox": {
      return <Textbox text={text} style={style} />;
    }
    case "button": {
      return <Button text={text} style={style} onClick={runLogic} />;
    }
    default: {
      return <div>Type not found</div>;
    }
  }
}
