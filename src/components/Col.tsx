import { mergeClasses, resolveStyles, StyledProps } from "@/util/StyleUtil";
import { ReactNode } from "react";

interface ColProps extends StyledProps {
  center?: boolean;
  children: ReactNode;
}
export function Col(props: ColProps) {
  const { children, center = false } = props;
  const className = mergeClasses("flex flex-col", center ? "items-center" : "");

  return <div {...resolveStyles(props, className)}>{children}</div>;
}
