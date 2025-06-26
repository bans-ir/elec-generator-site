import type React from "react";

interface IMModalProps {
  children: React.ReactNode;
  onClose: () => void;
  isShow: boolean;
}

export type { IMModalProps };
