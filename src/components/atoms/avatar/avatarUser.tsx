import "./styles.css";
type Avatarprops = {
  src: string;
  fullName?: string;
  size?: string;
  className?: string;
};

export default function Avatar({
  src,
  fullName,
  size,
  className,
}: Avatarprops) {

  console.log(size ? size : "middle")
  return (
    <div className={className ? className : `avatarContainer  ${size ? size : "middle"}`}>
      <img className="avatar" src={src} alt={fullName} />
    </div>
  );
}
