/* eslint-disable @typescript-eslint/no-explicit-any */

export default function ItemWrapper({ children }: any) {
    return (
      <div className="flex items-center justify-center w-full">{children}</div>
    );
  }