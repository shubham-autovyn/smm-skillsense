import { css } from "styled-components";

/**
 * Create a flex container with the specified properties.
 *
 * @param {string} direction - The direction of the flex container. Defaults to 'row'.
 * @param {string} align - The alignment of the flex items. Defaults to 'center'.
 * @param {string} justify - The justification of the flex items. Defaults to 'center'.
 * @param {string} wrap - The wrapping behavior of the flex container. Defaults to 'nowrap'.
 * @return {css} The CSS for the flex container.
 */
export const flex = (
  direction = "row",
  align = "center",
  justify = "center",
  wrap = "nowrap"
) => css`
  display: flex;
  flex-direction: ${direction};
  align-items: ${align};
  justify-content: ${justify};
  flex-wrap: ${wrap};
`;

export const getFontSizes = (p3 = "14px") => {
  let number = Number(p3.split("px")[0]);

  number = number === 0 ? 14 : number;

  const fontSizes = {
    cta: `${number + 6}px`, // 20px
    p1: `${number + 4}px`, // 18px
    p2: `${number + 2}px`, // 16px
    p3: `${number}px`, // 14px
    p4: `${number - 2}px`, // 12px
    p5: `${number - 4}px`, // 10px
    h1: `${Math.round(number * 3.2142)}px`, // 45px
    h2: `${number * 2}px`, // 28px
    h3: `${Math.round(number * 1.7145)}px`, // 24px
  };

  return fontSizes;
};
