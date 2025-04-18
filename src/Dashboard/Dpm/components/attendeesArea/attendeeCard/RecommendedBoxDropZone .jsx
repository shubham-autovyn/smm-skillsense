import { Box } from "@mui/material";
import { useMemo } from "react";
import { Recommended, RecommendedBoxHeading } from "../attendeesArea.styles";
import NewRecommendedBox from "./recommededBox";

const RecommendedArea = ({
  recommendedData,
  onDrop,
  onRemove,
  newJoineeData,
}) => {
  const generateHeadingPath = (node, currentPath = []) => {
    if (
      node.areaChildren &&
      node.areaChildren.every((child) => child.newJoiners === 0)
    ) {
      return [];
    }
    const path = [...currentPath, node.name];
    if (node.children && node.children.length > 0) {
      return node.children.flatMap((child) => generateHeadingPath(child, path));
    } else {
      return [path.join(".")];
    }
  };

  const renderedHeadings = useMemo(() => {
    if (!newJoineeData) return {};
    const uniqueHeadings = new Set();
    const headingPaths = generateHeadingPath(newJoineeData);
    return headingPaths.filter((path) => {
      if (uniqueHeadings.has(path)) {
        return false;
      } else {
        uniqueHeadings.add(path);
        return true;
      }
    });
  }, [newJoineeData]);

  const getLastChild = (item, heading, newArray = []) => {
    const parts = heading.split(".");

    newArray.push(item.name);
    const isMatch = parts.every((part, index) => part === newArray[index]);

    let lastChildren = [];

    if (Array.isArray(item)) {
      return item.flatMap((subItem) =>
        getLastChild(subItem, heading, [...newArray])
      );
    } else if (typeof item === "object" && item !== null) {
      if (isMatch && item.areaChildren) {
        lastChildren.push(item.areaChildren);
      }

      if (item.children) {
        item.children.forEach((child) => {
          const childResults = getLastChild(child, heading, [...newArray]);
          if (childResults.length > 0) {
            lastChildren.push(...childResults);
          }
        });
      }
    }

    return lastChildren;
  };

  return (
    <Recommended>
      <Box style={{ overflowY: "auto" }}>
        {renderedHeadings &&
          renderedHeadings.map((heading, index) => {
            const headingNode = renderedHeadings.includes(heading)
              ? newJoineeData
              : null;

            const lastChildren = getLastChild(headingNode, heading);

            return (
              <Box key={index}>
                <RecommendedBoxHeading variant="h4">
                  {heading}
                </RecommendedBoxHeading>

                {lastChildren[0]
                  ?.filter((child) => child.newJoiners !== 0)
                  ?.map((child, idx) => {
                    const updatedRecommendedData = recommendedData
                      ?.map((item) => {
                        if (child?.staffIds?.includes(item?.id)) {
                          return item;
                        }
                        return null;
                      })
                      .filter(Boolean);

                    return (
                      <NewRecommendedBox
                        key={idx}
                        child={child}
                        id={idx}
                        recommendedData={updatedRecommendedData}
                        onDrop={onDrop}
                        onRemove={onRemove}
                      />
                    );
                  })}
              </Box>
            );
          })}
      </Box>
    </Recommended>
  );
};

export default RecommendedArea;
