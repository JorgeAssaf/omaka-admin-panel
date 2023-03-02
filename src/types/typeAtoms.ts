export interface TypographyProps {
    variant: 'section' | 'cardTitle' | 'cardInfo' | 'button' | 'chip' | 'label';
    color?: string;
    customedStyles?: Object;
    children: string;
  }