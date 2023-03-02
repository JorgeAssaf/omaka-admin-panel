import { TypographyProps } from "../../types/typeAtoms";
import Colors from "../../utils/colors";

export default function Typography({
  variant,
  color = Colors().tizatl600,
  children,
}: TypographyProps) {
  switch (variant) {

    case 'cardTitle':
      return (
        <div
          style={{
            fontFamily: 'Nunito',
            fontWeight:700,
            fontSize: '1.2em',
            color:color
          }}>
          {children}
        </div>
      );
    case 'cardInfo':
      return (
        <div
          style={{
            fontFamily: 'Nunito',
            fontWeight:500,
            fontSize: '1em',
            color:color
          }}>
          {children}
        </div>
      );
    case 'chip':
      return (
        <div
          style={{
            fontFamily: 'Nunito',
            fontWeight:700,
            fontSize: '1em',
            color:color
          }}>
          {children}
        </div>
      );
    case 'label':
      return (
        <div
          style={{
            fontFamily: 'Nunito',
            fontWeight:600,
            fontSize: '1em',
            color:color
          }}>
          {children}
        </div>
      );
    default:
      return (
        <div
          style={{
            fontFamily: 'Nunito',
            fontWeight:700,
            fontSize: '1em',
            color:color
          }}>
          {children}
        </div>
      );
  }
}
