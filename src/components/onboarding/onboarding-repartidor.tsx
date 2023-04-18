import { OnboardingGeneral } from ".";
import OnBoardingSliderBar from "./Menus/onboarding-menus";
import Tour from "reactour";

interface OnboradingProps {
    onCloseTour: () => void;
    isOpen: boolean;
  }
  
  const stepsPedidos = [
    {
      selector: ".onboarding-item-repartidor",
      content: () =>
        (
          <OnboardingGeneral
            title="En hora buena, tu primer repartidor"
            subtitle="Ahora da click sobre el"
          />
        ) as any
    },   
  ];
  
  export const OnboradingRepartidor = ({ isOpen, onCloseTour }: OnboradingProps) => {
    console.log('====================================');
    console.log(isOpen);
    console.log('====================================');
    return (
      <Tour
        onRequestClose={onCloseTour}
        steps={stepsPedidos}
        isOpen={isOpen}
        className="helper"
        rounded={5}
      />
    );
  };