"use client";

import { Col } from "@/components/Col";
import { useReceive } from "@/hooks/broadcastHooks";

export default function ClientPage() {
  useReceive((message) => {
    console.log(message);
  });
  return <Col>Hello</Col>;
}
