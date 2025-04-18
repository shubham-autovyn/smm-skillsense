import styled from "styled-components";

export const BasicRequirementBox = styled.div`
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e6e9f0;
  background-color: white;
`;
export const BasicRequirementText = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  letter-spacing: -0.025em;
  color: #343536;
  margin-bottom: 4px;
`;
export const BasicRequirementSubText = styled.p`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  letter-spacing: -0.025em;
  color: #343536;
  margin-bottom: 10px;
`;

export const BasicRequirementContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const BasicRequirementSubContainer = styled.div`
  display: flex;
  border-radius: 8px;
  border: 1px solid #e6e9f0;
  background-color: #ffffff;
  margin-bottom: 8px;
`;
export const BasicRequirementLeftBox = styled.div`
  padding: 16px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  height: 528px;
  overflow-y: auto;
  min-width: 316px;

  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    width: 0px; /* Hide scrollbar */
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none; /* For Firefox */

  /* Remove scrollbar track and thumb styling */
  &::-webkit-scrollbar-thumb {
    display: none; /* Hide the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    display: none; /* Hide the scrollbar track */
  }
`;
export const DataTable = styled.div`
  padding: 20px;
  height: 429px;
  overflow-y: auto;
  /* Hide scrollbar for Webkit browsers */
  &::-webkit-scrollbar {
    width: 0px; /* Hide scrollbar */
  }

  /* Hide scrollbar for Firefox */
  scrollbar-width: none; /* For Firefox */

  /* Remove scrollbar track and thumb styling */
  &::-webkit-scrollbar-thumb {
    display: none; /* Hide the scrollbar thumb */
  }

  &::-webkit-scrollbar-track {
    display: none; /* Hide the scrollbar track */
  }
`;

export const CurrentActiveText = styled.p`
  font-size: 14px;
  font-weight: 600;
  color: #343536;
  margin: 0;
  padding: 0;
`;
export const NormalText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #343536;
  margin: 0;
  padding: 0;
`;
export const BasicRequirementBoxRightTop = styled.div`
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.13);
  background-color: #e8e8f4;
  padding: 16px;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  border-radius: 0px 8px 0px;
`;
export const BasicRequirementBoxRightText = styled.p`
  font-size: 14px;
  font-weight: 400;
  color: #343536;
  margin: 0;
  padding: 0;
`;
export const BasicRequirementBoxRightSubText = styled.p`
  font-size: 16px;
  font-weight: 600;
  color: #343536;
  margin: 0;
  padding: 0;
`;
export const TopText = styled.div`
  background-color: #fbecc8;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  font-weight: 400;
  color: #343536;
  margin-top: 5px;
`;
export const UnderLinkText = styled.a`
  font-size: 14px;
  font-weight: 400;
  color: #171c8f !important;
  margin: 0;
  padding: 0;
  cursor: pointer;
`;
export const SnackBarContainer = styled.div`
  background-color: #dff6dd;
  border-radius: 4px;
  padding: 0px 10px;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  justify-content: space-between;
  color: #343536;
  font-size: 14px;
  font-weight: 400;
`;
