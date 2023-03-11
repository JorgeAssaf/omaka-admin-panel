import Colors from "../../../utils/colors";
import "./styles.css";
type Avatarprops = {
  src?: string;
  fullName?: string;
  uuid?: string;
  size?: string;
  editable?: boolean;
  fontColor?: string;
  onClick?: () => void;
};

export default function Avatar({
  src,
  fullName,
  uuid,
  onClick,
  size = "middle",
  editable,
  fontColor = Colors().tizatl600
}: Avatarprops) {
  const palette = [
    "#E0E0E0",
    "#FBF7EF",
    "#F2E6CF",
    "#CFF2DF",
    "#B2B2FE",
    "#C9C9FE",
    "#E3E3FE",
    "#F6CD79",
    "#FAE2B1",
    "#FFEBEB",
    "#FECFCF",
    "#FFB9B9",
    "#F57A7A",
    "#F2E38E",
    "#EBFBAF",
    "#D2A5FA",
    "#FAA5C9",
    "#85EBB7",
    "#65EEA8"
  ];

  const generateAvatar = (uuid='', name='') => {
    const randomIndex = Math.floor(
      Math.abs(parseInt(uuid, 36)) % palette.length
    );
    const color = palette[randomIndex];
    const initials = name.substring(0, 2).toUpperCase();

    let circleSize = 54;
    switch (size) {
      case 'small':
        circleSize = 36;
        break;
      case 'large':
        circleSize = 60;
        break;
      default:
        circleSize = 56;
        break;
    }
  
    let font = '60';
    switch (size) {
      case 'small':
        font = '24';
        break;
      case 'large':
        font = '56';
        break;
      default:
        font = '36';
        break;
    }

    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120">
      <circle cx="60" cy="60" r={circleSize} fill={color} />
      <text x="50%" y="50%" dy="0.35em" textAnchor="middle" fill={fontColor} fontSize={font}>{initials}</text>
    </svg>
    );
  };
  const avatar = generateAvatar(uuid, fullName);

  if (src || !uuid || !fullName  ) {
    return (
      <div
        onClick={() => (onClick ? onClick() : undefined)}
        className={`avatarContainer ${editable ? "editable" : ""}  ${size}`}
      >
        <img className="avatar" src={src} alt={fullName} />
      </div>
    );
  }
  return (
    <div
      onClick={() => (onClick ? onClick() : undefined)}
      className={`avatarContainer ${editable ? "editable" : ""}  ${size}`}
    >
      {avatar}
    </div>
  );
}
