import { useCallback, useEffect, useState } from "react";

function useBroadcastChannel(channelName = "test-channnel") {
  const [bc, setBc] = useState<BroadcastChannel>();

  useEffect(() => {
    if (!bc) {
      setBc(new BroadcastChannel(channelName));
    }

    return () => {
      if (bc) {
        bc.close();
        setBc(undefined);
      }
    };
  }, [bc, setBc, channelName]);

  return bc;
}

export function useBroadcast(channelName?: string) {
  const bc = useBroadcastChannel(channelName);

  const broadcast = useCallback(
    (message: string) => {
      if (bc) {
        bc.postMessage(message);
      } else {
        console.warn(
          "BroadcastChannel not initialized - couldn't send message: ",
          message
        );
      }
    },
    [bc]
  );

  return broadcast;
}

export function useReceive(
  fn: (message: string) => void,
  channelName?: string
) {
  const bc = useBroadcastChannel(channelName);

  const listener = useCallback(
    (e: MessageEvent) => {
      fn(e.data);
    },
    [fn]
  );

  useEffect(() => {
    bc?.addEventListener("message", listener);

    return () => {
      bc?.removeEventListener("message", listener);
    };
  });
}
