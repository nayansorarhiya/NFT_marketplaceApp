import { Box, Grid } from "@mui/material";
import { styled } from "@mui/system";
import React from "react";
import eth from "../../assets/images/eth.svg";
import info from "../../assets/images/info.svg";
import { getCurrencyLogo } from "../../utils";

const Price = styled(Box)`
  display: flex;
  gap: 4px;
`;

export default function PriceRange(props) {
  return (
    <Box sx={{ display: "flex", gap: "25px" }}>
      <Box
        sx={{
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          gap: "10px",
        }}
      >
        <Price>
          <span style={{ color: "#91939B" }}>24h: </span>
          <span>{props.apidata.onedayvolume.toFixed(2)}</span>
          <img
            style={{ marginLeft: "5px" }}
            src={getCurrencyLogo(props.apidata.network)}
            alt="eth"
          />
        </Price>
        <Box
          sx={{
            ...(props.apidata.onedaychange > 0
              ? { color: "#27AE60" }
              : { color: "#EB5757" }),
          }}
        >
          {props.apidata.onedaychange > 0 && "+"}
          {(props.apidata.onedaychange * 100).toFixed(2)}%
        </Box>
      </Box>
      <Box
        sx={{
          display: { xs: "block", sm: "flex", md: "flex", lg: "flex" },
          gap: "10px",
        }}
      >
        <Price>
          <span style={{ color: "#91939B" }}>Floor: </span>
          <span>{props.apidata.floorprice.toFixed(2)}</span>
          <img
            style={{ marginLeft: "5px" }}
            src={getCurrencyLogo(props.apidata.network)}
            alt="eth"
          />
        </Price>
        <Price>
          <span style={{ color: "#91939B" }}>Reveal: </span>
          <span style={{ color: "#27AE60" }}>
            {props.apidata.revealpercentage}%
          </span>
          <img style={{ marginLeft: "5px" }} src={info} alt="info" />
        </Price>
      </Box>
    </Box>
  );
}
