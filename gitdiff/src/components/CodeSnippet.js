const CodeSnippet = (props) => {
  const { data } = props;
  return (
    <div>
      <p>{data.header}</p>
      {data.lines.map((entry, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            flexDirection: "row",
            backgroundColor:
              entry.line[0] === "+"
                ? "#D8FFCB"
                : entry.line[0] === "-"
                ? "#FFE4E9"
                : "#ffffff",
            color:
              entry.line[0] === "+"
                ? "#00a000"
                : entry.line[0] === "-"
                ? "#a00000"
                : "#000000",
          }}
        >
          <div style={{ lineHeight: "1.5em", width: "50px" }}>
            {entry.line[0] != "+" ? entry.baseLineNumber : <span> </span>}
          </div>
          <div style={{ lineHeight: "1.5em", width: "50px" }}>
            {entry.line[0] != "-" ? entry.headLineNumber : <span> </span>}
          </div>
          <div>{entry.line}</div>
        </div>
      ))}
      <div style={{ display: "flex", flexDirection: "row" }}></div>
    </div>
  );
};

export default CodeSnippet;
