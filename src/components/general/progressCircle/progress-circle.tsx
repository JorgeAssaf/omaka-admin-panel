import { buildStyles, CircularProgressbar } from 'react-circular-progressbar';
import { ArrowRight } from '../../../utils/icons/arrowRight';
import 'react-circular-progressbar/dist/styles.css';
import Colors from '../../../utils/colors';
import './styles.css'
type ruteStatusInterface = {
  ruteStatus: string;
  progressRute: number;
  size?: 'small' | 'middle' | 'large';
}

export const ProgressRute = ({ruteStatus, progressRute=0,size='middle' } : ruteStatusInterface) => {
  const circleSize = size == 'small'?6:size == 'middle'?12:36;
  const colorPath = ruteStatus == 'stopped'?Colors().xochipaltic400:ruteStatus == 'finish'?Colors().chalchihuitl400:Colors().akostik200
  return(
    <div className={`containerProgress ${size}`}>
        <CircularProgressbar
          strokeWidth={circleSize}
          value={progressRute}
          styles={buildStyles({
            pathColor: colorPath,
            trailColor: Colors().akostik200,
          })}
        />
      <div className='icon'>
        <ArrowRight/>
      </div>
    </div>
  );

}

