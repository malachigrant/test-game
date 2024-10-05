export interface StyledProps {
  className?: string;
  style?: Record<string, unknown>;
}

export function resolveStyles(
  props: StyledProps,
  className?: string,
  style?: Record<string, unknown>
): StyledProps {
  return {
    className: mergeClasses(className, props.className),
    style: mergeStyles(style, props.style),
  };
}

export function mergeStyles(
  ...styles: (Record<string, unknown> | undefined)[]
): Record<string, unknown> {
  const resultStyle: Record<string, unknown> = {};
  styles.forEach((style) => {
    if (!style) {
      return;
    }
    Object.entries(style).forEach(([key, val]) => (resultStyle[key] = val));
  });
  return resultStyle;
}

export function mergeClasses(...classNames: (string | undefined)[]): string {
  return classNames
    .filter((className) => typeof className === "string")
    .filter((className) => className !== "")
    .reduce((acc, curr) => {
      return `${acc} ${curr}`;
    }, "");
}
