import { TreeItem, treeItemClasses } from "@mui/x-tree-view";
import styled from "styled-components";

export const TreeFilterBoxHeading = styled.p`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #343536;
  margin-bottom: 5px;
  margin-top: 0px;
`;
export const TreeFilterSearch = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
`;
export const TreeFilterInputBox = styled.div`
  padding: 4px 12px;
  border-radius: 4px;
  border: 1px solid #cfd2d9;
  display: flex;
  align-items: center;
  gap: 2px;
`;
export const TreeFilterInput = styled.input`
  outline: none;
  border: none;
  font-size: 14px;
  font-weight: 400;
  color: #343536;
  background-color: transparent;
  max-width: 150px;
  margin-top: 0px;
`;

export const TreeFilterButton = styled.button`
  font-family: Roboto;
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
  letter-spacing: -0.025em;
  text-align: center;
  color: #171c8f;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
`;
export const TreeFilterBoxBtn = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
`;
export const TreeFilterBtn = styled.button`
  outline: none;
  border-radius: 4px;
  background-color: ${(props) => props.bgcolor};
  color: ${(props) => props.textcolor};
  border: none;
  padding: 6px 20px;
  cursor: pointer;
  font-size: 12px;
  font-weight: 500;
`;

export const CustomTreeItem = styled(TreeItem)({
  borderLeft: "1px solid #CFD2D9",
  position: "relative",
  width: "200px",
  "&:before": {
    pointerEvents: "none",
    content: '""',
    position: "absolute",
    width: 11,
    left: 0,
    top: 15,
    borderBottom: "1px solid #CFD2D9",
    [`& .${treeItemClasses.iconContainer}`]: {
      "& .close": {
        opacity: 0.3,
      },
    },
  },
});
