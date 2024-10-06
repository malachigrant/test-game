"use client";
import { Button } from "@/components/Button";
import { Col } from "@/components/Col";
import { SceneRenderer } from "@/components/SceneRenderer";
import { Textbox } from "@/components/Textbox";
import { useBroadcast } from "@/hooks/broadcastHooks";
import { useState } from "react";
import scene1 from "@/resources/scene1.json";
import { GameState } from "@/types/GameState";

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
      <SceneRenderer gameState={scene1 as GameState} />
    </Col>
  );
}
