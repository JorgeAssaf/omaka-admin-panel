import Typography from "../../atoms/typography";
import "../styles.css";




const OnBoardingSliderBar = () => {
    return(
        <div className='onboard-content'>
        <div className='onboard-top'>
        <Typography variant="cardTitle">
            Barra de navegacion
        </Typography>
        <div className='onboard-subtitle'> 
            Aqui podras navegar entre las diferentes secciones :
                <br/>1.-Pedidos
                <br/>2.-Rutas
                <br/>3.-Repartidores
                <br/>4.-Reportes
                <br/>5.-Perfil
        </div>
        </div>
    </div>
    )
};

export default OnBoardingSliderBar;