export const Square = ({ children, updateBoard, index, winner, turn}) => {
  
    const handleClick = ()=>{
      updateBoard(index)
    }
    const className = `square ${winner && turn != children ? 'spin' : ''}`
    return (
      <div onClick={handleClick} className={className}>
        <p>{children}</p>
      </div>
    )
  }