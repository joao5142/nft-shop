import { styled } from "../";

export const SuccessContainer = styled("main", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  margin: "0 auto",
  height: 656,

  h1: {
    fontSize: "$2xl",
    color: "$gray100",
  },
  p: {
    fontSize: "$xl",
    color: "$gray300",
    maxWidth: 560,
    textAlign: "center",
    marginTop: "2rem",
    lineHeight: 1.4,
  },
  a: {
    marginTop: "5rem",
    display: "block",
    fontSize: "$lg",
    color: "$primary500",
    textDecoration: "none",
    fontWeight: "bold",

    "&:hover": {
      color: "$primary300",
    },
  },
});

export const ImageContainer = styled("div", {
  marginTop: "4rem",

  display: "flex",
  alignItems: "center",
  justifyContent: "center",

  img: {
    objectFit: "cover",
    borderRadius: "50%",
  },
});
