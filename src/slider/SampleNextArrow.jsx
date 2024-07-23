export function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} arrows`}
        style={{ ...style, display: "block", background: "transparent", position: "absolute" }}
        onClick={onClick}
      />
    );
  }
  