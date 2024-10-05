import { useEffect, useRef } from "react";

export function useBroadcast(channelName = "test-channnel") {
  const bc = useRef<BroadcastChannel>();

  useEffect(() => {
    bc.current = new BroadcastChannel(channelName);

    return () => {
      if (bc.current) {
        bc.current.close();
      }
    };
  });

  const broadcast = (message: string) => {
    if (bc.current) {
      bc.current.postMessage(message);
    } else {
      console.warn("Couldn't send message: ", message);
    }
  };

  return broadcast;
}
