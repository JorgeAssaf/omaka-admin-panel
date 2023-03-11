import './styles.css';
import LoaderOmaka from './loader-omaka-icon.svg';
import { LoaderIconOmaka } from '../../utils/icons/loaderIcon';
import Colors from '../../utils/colors';


export default function Loading() {  
    return (
      <div className='atom_loading_container'>
        <div className='atom_loading'>
          <LoaderIconOmaka  size={0.5} fill={Colors().tizatl600}/>
        </div>
      </div>
    );
  }