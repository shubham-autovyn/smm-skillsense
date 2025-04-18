import surpalsFream from "../../../../../../assets/svg/surpalsFream.svg";

const StackChartCard = ({ data }) => {
  return (
    <div
      style={{
        textAlign: "center",
        backgroundColor: "#F4F5F8",
        display: "flex",
        flexDirection: "column",
        gap: "50px",
        borderRadius: "8px",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <div
        style={{
          textAlign: "center",
          backgroundColor: "#F4F5F8",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
        }}
      >
        <h2 style={{ fontSize: "20px", color: "#66696B" }}>
          You have not selected a data point yet!
        </h2>
        <p style={{ fontSize: "15px ", color: "#66696B" }}>
          To view surplus operators, click on the corresponding surplus section
          in the graph above, as indicated below.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginLeft: "200px",
        }}
      >
        <img src={surpalsFream} alt="" />{" "}
        <span
          style={{
            border: "1px solid",
            display: "inline-block",
            width: "70px",
            height: "2px",
            backgroundColor: "black",
            verticalAlign: "middle",
            marginTop: "9px",
            color: "#CED0D4",
          }}
        ></span>{" "}
        <p style={{ fontSize: "13px", color: "#66696B" }}>Click on surplus</p>
      </div>
    </div>
  );
};

export default StackChartCard;
