import Typography from "../atoms/typography";
import "./styles.css";

interface OnboradingGeneralProps {
  title: string;
  subtitle: string;
  img?: any;
}


export const OnboardingGeneral = ({ title, subtitle, img }: OnboradingGeneralProps) => {
  return (
    <div className="onboard-content">
      <div className="onboard-top">
        <Typography variant="cardTitle">{title}</Typography>
        <div className="onboard-subtitle">{subtitle}</div>
      </div>
    </div>
  );
};
