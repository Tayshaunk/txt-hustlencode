import { Tooltip, Whisper } from 'rsuite';
import { momentDateDetailed, momentFromNow } from 'services/moment.service';
import classes from './FromNowDate.module.scss';

interface IProps {
  date: Date;
}

export default function FromNowDate(props: IProps) {
  const dateTooltip = <Tooltip>{momentDateDetailed(props.date)}</Tooltip>;

  return (
    <Whisper placement="top" trigger="hover" speaker={dateTooltip}>
      <span className={classes.Date}>{momentFromNow(props.date)}</span>
    </Whisper>
  );
}
