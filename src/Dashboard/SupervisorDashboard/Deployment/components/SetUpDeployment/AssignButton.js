import { useDrop } from 'react-dnd';
import { TraineeBox, TraineeP } from './SetUpDeployment.style';
const ItemTypes = {
  ATTENDEE: 'attendee',
};
const AssignButton = ({
  params,
  fieldId,
  field,
  onDrop,
  handleOpenTooltip,
}) => {
  const [{ isOver, canDrop }, drop] = useDrop({
    accept: ItemTypes.ATTENDEE,
    drop: (item) => {
      if (field === 'trainee') {
        onDrop(item, fieldId);
      }
    },
    canDrop: () => field === 'trainee',
    collect: (monitor) => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop(),
    }),
  });

  return (
    <div ref={drop}>
      <button
        style={{ backgroundColor: 'transparent' }}
        onClick={(event) => handleOpenTooltip(event, fieldId, params.field)}
      >
        <TraineeBox
          headerClassName="trainee"
          sx={{
            border:
              isOver && canDrop
                ? '2px dashed #4CAF50 !important'
                : '1px dashed #171c8f !important',
            color:
              isOver && canDrop ? '#4CAF50 !important' : '#171c8f !important',
            scale: isOver && canDrop ? '1.1' : '1',
            transition: 'all 0.3s ease',
          }}
        >
          <TraineeP>+ Assign</TraineeP>
        </TraineeBox>
      </button>
    </div>
  );
};
export default AssignButton;
