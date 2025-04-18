import PropTypes from "prop-types";
import React from "react";

const FLEXBOX_PROPS = [
  "direction",
  "align",
  "justify",
  "flex",
  "gap",
  "rowGap",
  "colGap",
  "wrap",
  "responsive",
  "fullWidth",
  "halfWidth",
];

const FlexBox = ({
  className = "",
  children,
  direction,
  align = "normal",
  justify = "normal",
  flex = "0 1 auto",
  gap,
  rowGap,
  colGap,
  wrap,
  fullWidth,
  halfWidth,
  height = "auto",
  ...rest
}) => {
  // Dynamically set inline styles based on props
  const containerStyles = {
    display: "flex",
    flexDirection: direction,
    alignItems: align,
    justifyContent: justify,
    flex,
    height,
    flexWrap: wrap || "nowrap",
    gap: gap || undefined,
    rowGap: rowGap || undefined,
    columnGap: colGap || undefined,
    width: fullWidth ? "100%" : halfWidth ? "50%" : undefined,
  };

  return (
    <div className={className} style={containerStyles} {...rest}>
      {children}
    </div>
  );
};

FlexBox.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
  direction: PropTypes.oneOf([
    "row",
    "row-reverse",
    "column",
    "column-reverse",
  ]),
  align: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "stretch",
    "baseline",
    "normal",
  ]),
  justify: PropTypes.oneOf([
    "flex-start",
    "center",
    "flex-end",
    "space-between",
    "space-around",
    "space-evenly",
    "normal",
  ]),
  flex: PropTypes.string,
  gap: PropTypes.string,
  rowGap: PropTypes.string,
  colGap: PropTypes.string,
  wrap: PropTypes.oneOf(["nowrap", "wrap", "wrap-reverse"]),
  fullWidth: PropTypes.bool,
  halfWidth: PropTypes.bool,
  height: PropTypes.string,
};

export default FlexBox;
