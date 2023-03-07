import React from 'react';

type DescripcionPlanInterace = {
    nivel : string;
}

export const DescripcionPlan = ({nivel} : DescripcionPlanInterace) =>(
    <div className='lista-beneficios'>

        {
            nivel === 'basic' ? 
            <div>
            <ul>
            <li>
                Creación de rutas
            </li>
            <li>
                Creación de conductores
            </li>
            <li>
                Más beneficios
            </li>
        </ul>
            </div>
            :
            <div>
            <ul>
            <li>
                Control de inventario
            </li>
            <li>
                Rutas ilimitadas
            </li>
            <li>
                Conductores ilimitados
            </li>
            <li>
                Seguimiento a tiempo real de tus  conductores
            </li>
            <li>
                Historial de rutas
            </li>
        </ul>
            </div>
        }

        
    </div>
)