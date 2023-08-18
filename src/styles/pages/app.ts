import { styled } from "..";

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
  minHeight: "100vh",
});

export const Header = styled("header", {
  padding: "2rem 0",
  width: "100%",
  maxWidth: 1180,
  margin: "0 auto",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",

  strong: { fontSize: "2rem", cursor: "pointer" },

  button: {
    padding: "10px 12px",
    backgroundColor: "$gray800",
    outline: 0,
    border: 0,
    borderRadius: 6,
    cursor: "pointer",
  },
});
