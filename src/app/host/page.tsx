"use client";
import { Button } from "@/components/Button";
import { Col } from "@/components/Col";
import { Textbox } from "@/components/Textbox";
import { useBroadcast } from "@/hooks/broadcastHooks";
import { useState } from "react";

export default function HostPage() {
  const broadcast = useBroadcast();
  const [text, setText] = useState("");
  const onClick = () => {
    broadcast(text);
  };
  return (
    <Col center>
      <Textbox text={text} onChange={setText} />
      <Button text="Submit" onClick={onClick} />
    </Col>
  );
}
