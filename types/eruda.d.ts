declare global {
  interface Window {
    eruda: {
      init: () => void;
      show: () => void;
    };
  }
}

export {};
