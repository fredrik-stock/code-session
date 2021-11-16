import { ReactNode } from "react";

export const Todo = ({ what, how, children }: { what: string; how?: string; children: ReactNode }) => {
  return (
    <div
      style={{
        border: "1px dashed grey",
        backgroundColor: "#eee",
        padding: 16,
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <strong>{what}</strong>
      {how && <div>{how}</div>}

      {children && (
        <div
          style={{
            backgroundColor: "#fff",
            border: "1px solid green",
            padding: 16,
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};
