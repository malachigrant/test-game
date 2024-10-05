"use client";
import { resolveStyles, StyledProps } from "@/util/StyleUtil";

interface ButtonProps extends StyledProps {
  text: string;
  onClick: () => void;
  disabled?: boolean;
}

export function Button(props: ButtonProps) {
  const { text, onClick, disabled = false } = props;

  const className =
    "p-2 m-2 rounded-md border-neutral-700 max-w-fit bg-blue-600 text-neutral-50";

  return (
    <input
      type="button"
      onClick={onClick}
      value={text}
      disabled={disabled}
      {...resolveStyles(props, className)}
    />
  );
}
