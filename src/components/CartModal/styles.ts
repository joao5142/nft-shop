import { styled } from "../../styles";

export const CartModalContainer = styled("div", {
  backgroundColor: "$gray800",

  width: "100%",
  maxWidth: "470px",
  height: "100vh",
  padding: "3rem 2rem",

  position: "fixed",
  right: 0,
  top: 0,

  display: "grid",
  gridTemplateRows: "auto 1fr auto",
  gap: 35,

  "& >:nth-child(1)": {
    marginLeft: "auto",
    cursor: "pointer",
  },

  footer: {
    button: {
      backgroundColor: "$primary300",
      padding: "1rem 2rem",
      borderRadius: 10,
      width: "100%",
      color: "white",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
    },
  },
});

export const CartModalMainContent = styled("div", {});

export const CartModalContentColumn = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",
});
export const CartModalProductContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: 20,
  marginTop: 30,
});

export const CartModalProduct = styled("div", {
  display: "flex",
  gap: 15,
});
export const CartModalProductInfo = styled("div", {
  "*": {
    display: "block",
    marginTop: 10,
  },
  a: {
    textDecoration: "none",
    color: "$primary100",
    cursor: "pointer",
  },
});

export const CartModalProductImageContainer = styled("div", {
  background: "linear-gradient(180deg, #4e2e95 0%, #9d4eff 100%)",
  borderRadius: 8,

  position: "relative",
  overflow: "hidden",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  width: "90px",

  img: {
    objectFit: "cover",
  },
});

export const CartModalQuantityInfo = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 12,
  span: {
    fontSize: "0.9rem",
  },
});
export const CartModalProductInfoContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 20,
  flex: 1,
  "&:nth-child(1)": {
    flex: 1,
  },
});

export const CartModalPriceInfo = styled("div", {
  display: "flex",
  justifyContent: "space-between",
  marginBottom: 10,

  strong: {
    fontSize: "1.2rem",
  },
});
export const CartModalActions = styled("div", {
  display: "flex",
  alignItems: "center",
  gap: 10,

  span: {
    fontWeight: "bold",
  },

  button: {
    padding: "0.1rem 1rem",
    fontSize: "1.1rem",
    background: "$primary100",
    border: 0,
    outline: 0,
    borderRadius: 4,
    color: "white",
    cursor: "pointer",
    "&:active": { transform: "scale(0.98)" },
  },
});
