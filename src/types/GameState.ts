export interface GameState {
  layout: Record<string, LayoutItem>;
  state: Record<string, number>;
}

type LayoutItemType = "textbox" | "button";

type Action = "set" | "get";

type Operator = "+" | "-" | "*" | "/";

export interface LayoutItem {
  id: string;
  type: LayoutItemType;
  text: string;
  position: {
    x: string;
    y: string;
  };
  logic?: {
    action: Action;
    value: LogicValue;
    variable: string;
  }[];
}

export type LogicValue =
  | number
  | {
      operator: Operator;
      values: LogicValue[];
    }
  | {
      action: Action;
      variable: string;
    };

// "logic": [
//     {
//       "action": "set",
//       "variable": "x",
//       "value": {
//         "operator": "+",
//         "values": [1, { "action": "get", "value": "x" }]
//       }
//     }
//   ]
