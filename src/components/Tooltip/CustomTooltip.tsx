import React from 'react';
import { Whisper, Tooltip } from 'rsuite';

interface ICustomTooltipProps {
  msg: string; // the message to show in the tooltip
  children: any; // the content to render as the trigger for the tooltip
  className: string; // styles
  placement:
    | 'top'
    | 'topStart'
    | 'topEnd'
    | 'leftStart'
    | 'rightStart'
    | 'left'
    | 'right'
    | 'leftEnd'
    | 'rightEnd'
    | 'bottomStart'
    | 'bottom'
    | 'bottomEnd'; // placement for tooltip
}

const CustomTooltip = ({ msg, children, className, placement }: ICustomTooltipProps) => {
  const tooltip = <Tooltip>{msg}</Tooltip>;

  return (
    <div className={className}>
      <Whisper placement={placement} controlId="control-id-hover" trigger="hover" speaker={tooltip}>
        <div>{children}</div>
      </Whisper>
    </div>
  );
};

export default CustomTooltip;
