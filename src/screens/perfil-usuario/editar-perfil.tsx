import React, {useState} from 'react';
import Avatar from '../../components/atoms/avatar/avatarUser';
import { getAuth, signOut } from "firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/reducers/mainReducer";
import "./styles.css";
import { Buttons } from '../../components/atoms/buttons';
import Colors from "../../utils/colors";
import { DescripcionPlan } from './descripcion-plan';
import { ModalContrata } from './modal-contrata';

export const EditarPerfilUsuario = () =>{

    const {DatosPersonales, Nivel, Pedidos, Productos, Rutas, Conductores} = useSelector((state: RootState) => state.user.userData as any);
    const auth = getAuth();
    const dispatch = useDispatch();
    const inputRef = [
        React.createRef(),
        React.createRef(),
        React.createRef(),
        React.createRef(),
      ];   
      
    const [disableInput, setDisabledInput] = useState(true);
    const [textButton, settextButton] = useState('Editar Perfil');
    const [openModal, setOpenModal] = useState(false);

    const editarCampo = () =>{
        setDisabledInput(false);
        settextButton('Guardar')

        if(textButton == 'Guardar'){
            setDisabledInput(true);
            settextButton('Editar perfil')  
        }
    }



    return(
        <div className='perfil-container'>
            <div className='column derecha'>
            <Avatar src="https://firebasestorage.googleapis.com/v0/b/omaka-app.appspot.com/o/Patterns%20-%206x6%20(10).png?alt=media&token=817c18a2-d4ac-45f8-ae7e-061fc0d99668" size='xlarge' />
            <div className='text-container'>
            <div className='text'>
            <div className="text-enfasis">
                Tipo de cuenta
            </div>
            <div className='tipo-cuenta'>
               {Nivel.toLocaleUpperCase()}
            </div>
            </div>
            <div  className='text'>
            <div className="subtitulo">
                Nombre:
            </div>
            <input value={DatosPersonales.nombre} disabled={disableInput}/>
            </div>
            <div  className='text'>
            <div className="subtitulo">
                Apellido:
            </div>
            <input value={DatosPersonales.apellido} disabled={disableInput}/>
            </div>
            <div  className='text'>
            <div className="subtitulo">
                Correo:
            </div>
            <input value={DatosPersonales.correo} disabled/>

            </div>

            <div  className='text'>
            <div className="subtitulo">
                Empresa:
            </div>
            <div>
                {DatosPersonales.nombreEmpresa}
            </div>
            </div>
            <div  className='text'>
            <div className="subtitulo">
                Conductores activos:
            </div>
            <div>
                {Conductores}
            </div>
            </div>

            <div  className='text'>
            <div className="subtitulo">
                Rutas:
            </div>
            <div>
                {Rutas}
            </div>
            </div>
            </div>
            <Buttons
          action={() => editarCampo()}
          text={textButton}
          type="primary"
          color={Colors().akostik200}
          textColor={Colors().tizatl600}
        />
            </div>

            <div className='column izquierda'>
                <div className='primer-elemento'>
                    <img src='src\utils\icons\pin-omaka.svg' className='pin-image'/>
                <div className='titulo-nivel'>
                    Omaka {Nivel.toLocaleUpperCase()}
                </div>
                </div>
                <DescripcionPlan nivel={Nivel} />
                <div className='boton-contrata'>
                <Buttons
          action={() => setOpenModal(true)}
          text='Contrata Premium'
          type="primary"
          color={Colors().chalchihuitl200}
          textColor={Colors().tizatl600}
          />
          </div>
            </div>

        <ModalContrata open={openModal} onClose={() => setOpenModal(false)} nivel={Nivel} />
        </div>
    );
}