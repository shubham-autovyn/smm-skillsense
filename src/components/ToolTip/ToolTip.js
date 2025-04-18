import { Box, Tooltip } from '@mui/material';
import React, { useEffect, useRef } from 'react';
const TooltipComponent = ({
  open,
  title,
  onClose,
  children,
  anchorEl,
  height,
  width,
  position = 'bottom',
}) => {
  const tooltipRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        tooltipRef.current &&
        !tooltipRef.current.contains(event.target) &&
        event.target.tagName !== 'INPUT' &&
        event.target.tagName !== 'P' &&
        event.target.tagName !== 'LI' &&
        event.target.tagName !== 'SELECT' &&
        event.target.tagName !== 'BUTTON'
      ) {
        onClose?.();
      }
    };

    if (open) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [open, onClose]);

  return (
    <Tooltip
      title={title}
      open={open}
      onClose={onClose}
      disableFocusListener
      disableHoverListener
      disableTouchListener
      position={position}
      arrow
      PopperProps={{
        sx: {
          '& .MuiTooltip-tooltip': {
            backgroundColor: 'white',
            color: 'black',
            border: '1px solid #CFD2D9',
            borderRadius: '4px',
            padding: '8px',
            width: width ? width : 'auto',
          },
          '& .MuiTooltip-arrow': {
            // color: "black !important",
            fontSize: '10px !important',
            backgroundColor: 'transparent !important',
            size: '20px !important',
          },
        },
        anchorEl: anchorEl,
        placement: position,
      }}
    >
      <Box
        ref={tooltipRef}
        sx={{
          position: 'absolute',
          top: '50px',
          left: '50%',
          height: height ? height : 'auto',
          width: width ? width : 'auto',
          overflowY: 'auto',
        }}
      >
        {children}
      </Box>
    </Tooltip>
  );
};
export default TooltipComponent;
