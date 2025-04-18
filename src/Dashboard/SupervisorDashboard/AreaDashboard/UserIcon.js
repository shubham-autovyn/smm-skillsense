const OperatorUserIcon = ({ fill = "black" }) => (
  <svg
    viewBox="0 0 16 16"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    style={{ height: "1.7rem", width: "1.7rem", marginRight: "1rem" }}
  >
    <path
      d="M8 8C10.2091 8 12 6.20914 12 4C12 1.79086 10.2091 0 8 0C5.79086 0 4 1.79086 4 4C4 6.20914 5.79086 8 8 8Z"
      fill={fill}
    />
    <path
      d="M8 9.33203C4.68781 9.33572 2.00369 12.0198 2 15.332C2 15.7002 2.29847 15.9987 2.66666 15.9987H13.3333C13.7015 15.9987 14 15.7002 14 15.332C13.9963 12.0198 11.3122 9.33569 8 9.33203Z"
      fill={fill}
    />
  </svg>
);

export default OperatorUserIcon;
