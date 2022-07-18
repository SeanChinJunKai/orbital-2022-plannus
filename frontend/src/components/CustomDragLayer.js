import { useDragLayer } from 'react-dnd'
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as tinycolor from 'tinycolor2';

const layerStyles = {
  position: 'fixed',
  pointerEvents: 'none',
  top: 0,
  left: 0,
  zIndex: 100,
}

function getItemStyles(currentOffset, color) {
  if (!currentOffset) {
    return {
        display: 'none',
    }
  }
  let { x, y } = currentOffset;
  
  const transform = `translate(${x}px, ${y}px)`
  return {
    transform,
    WebkitTransform: transform,
    background: color,
    height: '5rem',
    minWidth: '20rem',
    borderRadius: '0.25rem',
    padding: '0.25rem 0.5rem',
    margin: '0.14rem',
    flex: 1,
  }
}

export const CustomDragLayer = () => {
  const { itemType, isDragging, item, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      currentOffset: monitor.getClientOffset(),
      isDragging: monitor.isDragging(),
    }))

  function renderItem() {
    switch (itemType) {
      case "module":
        return <>
                <div className='tile-close-container'>
                    <FontAwesomeIcon icon={faXmark} className="tile-close-button" />
                </div>
                <h5>{item.module.moduleCode}</h5>
                <h5>{item.module.moduleCredit} MC</h5>
                </>
            
      default:
        return null
    }
  }
  if (!isDragging) {
    return null
  }
  return (
    <div style={layerStyles}>
      <div
        style={getItemStyles(currentOffset, item.module.color)}
      >
        {renderItem()}
      </div>
    </div>
  )
}
