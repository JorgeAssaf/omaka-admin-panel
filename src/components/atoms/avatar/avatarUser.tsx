import "./styles.css";
type Avatarprops = {
  src?: string;
  fullName?: string;
  size?: string;
  editable?: boolean;
  onClick?:()=> void;
};

export default function Avatar({
  src,
  fullName,
  onClick,
  size = "middle",
  editable
}: Avatarprops) {
const deaultSource = 'https://firebasestorage.googleapis.com/v0/b/omaka-app.appspot.com/o/Patterns%20-%206x6%20(10).png?alt=media&token=817c18a2-d4ac-45f8-ae7e-061fc0d99668';
  return (
    <div onClick={()=>onClick?onClick():undefined}  className={`avatarContainer ${editable?'editable':''}  ${size}`}>
      <img className="avatar" src={src?src:deaultSource} alt={fullName} />
    </div>
  );
}
