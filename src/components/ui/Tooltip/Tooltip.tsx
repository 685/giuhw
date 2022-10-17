import * as React from 'react';
import {styled} from '@mui/material/styles';
import Tooltip, {TooltipProps} from '@mui/material/Tooltip';

const StyledTooltip = styled(({
                                  className,
                                  children,
                                  ...props
                              }: TooltipProps) => (
    <Tooltip {...props} classes={{popper: className}}>
        {children}
    </Tooltip>
))`
  & .MuiTooltip-tooltip {
    background: var(--tooltip-background);
    color: var(--tooltip-color);
    font-size: .9rem;
    padding: 8px 12px;
  }
`;

export default StyledTooltip;