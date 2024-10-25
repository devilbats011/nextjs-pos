import { toast as t } from 'sonner';
import React from 'react';

export const useSonnerToast = (duration = 1000)  => {

  const toaster = (ToasterMessage: React.ReactNode | string) => {
    t(ToasterMessage, {
      position: 'top-center',
      duration,
    });
  };
  return { toaster };
};
