import { styled } from "..";

export const HomeContainer = styled("main", {
  display: "flex",
  width: "100%",
  maxWidth: "calc(100vw - ((100vw - 1180px) / 2))",
  marginLeft: "auto",
  minHeight: 656,
});

export const Product = styled("a", {
  background: "linear-gradient(180deg, #4e2e95 0%, #9d4eff 100%)",
  borderRadius: 8,

  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "contain",
    maxHeight: 300,
    cursor: "pointer",
  },

  footer: {
    position: "absolute",
    bottom: "0.25rem",
    left: "0.25rem",
    right: "0.25rem",
    padding: "2rem",

    borderRadius: 6,

    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",

    backgroundColor: "rgba(0, 0, 0, 0.6)",

    transform: "translateY(110%)",
    opacity: 0,
    transition: "all 0.2s ease-in-out",

    strong: {
      fontSize: "$lg",
      color: "$gray100",
      display: "block",
      marginBottom: 5,
    },

    span: {
      fontSize: "$xl",
      fontWeight: "bold",
      color: "$primary100",
      display: "block",
    },

    button: {
      padding: "10px 12px",
      backgroundColor: "$primary300",
      outline: 0,
      border: 0,
      borderRadius: 6,
      cursor: "pointer",
    },
  },

  "&:hover": {
    footer: {
      transform: "translateY(0%)",
      opacity: 1,
    },
  },
});
