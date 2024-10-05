"use client";
import { Button } from "@/components/Button";
import { Col } from "@/components/Col";
import { Textbox } from "@/components/Textbox";
import { useState } from "react";

export default function HostPage() {
  const [text, setText] = useState("");
  return (
    <Col center>
      <Textbox text={text} onChange={setText} />
      <Button text="Submit" onClick={() => {}} />
    </Col>
  );
}
