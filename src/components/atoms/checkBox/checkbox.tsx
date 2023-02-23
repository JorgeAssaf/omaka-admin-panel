import "./styles.css";
type CheckBoxProps = {
  isActive: boolean;
  setIsActive: (value: boolean) => void;
  size: number;
};

export default function CheckBox({
  isActive,
  setIsActive,
  size
}: CheckBoxProps) {
  return (
    <div
      onClick={() => setIsActive(!isActive)}
      className="checkBoxContainer"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {isActive && (
        <div
          className="checkBoxBody"
          style={{ width: `${size * 0.7}px`, height: `${size * 0.7}px` }}
        />
      )}
    </div>
  );
}
