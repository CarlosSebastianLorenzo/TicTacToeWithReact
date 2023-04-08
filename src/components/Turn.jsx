import { TURNS } from '../utils/constants.js'

export const Turn = ({isSelected, children, winner}) =>{
    const className = `turn ${isSelected ? 'selected' : ''} ${winner ? 'winner' : ''}`
    const champion = `${children === TURNS.X ? `${TURNS.O}`:`${TURNS.X}`}`
    return(
        <h3 className={className}>
        {winner? `The Winner is ${champion}` : `Is the Turn of ${children}`}
        </h3>
    )
}