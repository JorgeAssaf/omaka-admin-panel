import { OnboardingGeneral } from ".";
import OnBoardingSliderBar from "./Menus/onboarding-menus";
import Tour from "reactour";

interface OnboradingProps {
    onCloseTour: () => void;
    isOpen: boolean;
  }
  
  const stepsPedidos = [
    {
      selector: ".slide-bar-onboarding",
      content: () => (<OnBoardingSliderBar />) as any
    },
    {
      selector: ".onboarding-header-add",
      content: () =>
        (
          <OnboardingGeneral
            title="Agregar un elemento"
            subtitle="Aqui puedes agregar un pedido"
          />
        ) as any
    },
    {
      selector: ".onboarding-header-filter",
      content: () =>
        (
          <OnboardingGeneral
            title="Filtra los pedidos"
            subtitle="Puedes filtrar los pedidos por status"
          />
        ) as any
    },
    {
      selector: ".onboarding-pedido-list",
      content: () =>
        (
          <OnboardingGeneral
            title="Lista de pedidos"
            subtitle="En esta seccion miraras todos tus pedidos, una vez que los agregues"
          />
        ) as any
    },
    {
      selector: ".onboarding-mapa",
      content: () =>
        (
          <OnboardingGeneral
            title="Mapa"
            subtitle="En esta parte podras ver en el mapa todos tus pedidos, rutas y repartidores"
          />
        ) as any
    }
    
  ];
  
  export const OnboradingPedidos = ({ isOpen, onCloseTour }: OnboradingProps) => {
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