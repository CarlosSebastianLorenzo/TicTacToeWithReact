import './styles/App.css'
import { useState } from 'react'
import confetti from 'canvas-confetti'
import { Square } from './components/Square.jsx'
import { Turn } from './components/Turn.jsx'
import { TURNS, Winner_Combos } from './utils/constants.js'
import Footer from './components/Footer.jsx'

function App() {
  const [board,setBoard] = useState(Array(9).fill(null))
  const [turn, setTurn] = useState(TURNS.X)
  const [winner, setWinner] = useState(null)
  
  const checkWinner = (boardToCheck) => {
    for (const combo of Winner_Combos) {
      const [a, b, c] = combo
      if(
        boardToCheck[a] &&
        boardToCheck[a] === boardToCheck[b] &&
        boardToCheck[a] === boardToCheck[c]
      ){
        return boardToCheck[a]
      }
    }
    return null
  }

  const checkEndGame = (boardToCheck) => {
    return boardToCheck.every((square)=>square!=null)
  }

  const updateBoard = (index)=>{

    if (board[index] || winner) return

    const newBoard = [...board]
    newBoard[index] = turn
    setBoard(newBoard)
    const newTurn = turn === TURNS.X ? TURNS.O : TURNS.X
    setTurn(newTurn)
    const newWinner = checkWinner(newBoard)
    if (newWinner){
        confetti()

      setWinner(newWinner)

    } else if (checkEndGame(newBoard)){
      setWinner(false)
    }
  }

  const resetGame = ()=>{
    setBoard(Array(9).fill(null))
    setTurn(TURNS.X)
    setWinner(null)
  }

  return (
    <>
      <main className='board'>
        <h1>Tic Tac Toe</h1>
        {winner == false ? (
          <section>
            <h3 className="winner">Tie Game</h3>
          </section>
        ):(
          <section>
            <Turn isSelected={turn === TURNS.X} winner={winner}>{TURNS.X}</Turn>
            <Turn isSelected={turn === TURNS.O} winner={winner}>{TURNS.O}</Turn>
          </section>
        )}
        <section className="game">
          {
            board.map((_,index)=>{
              return (
                <Square winner={winner} turn={turn} index={index} key={index} updateBoard={updateBoard}>
                  {board[index]}
                </Square>
              )
            })
          }
        </section>
          <button className='reset' onClick={resetGame}>Reset Game</button>
      </main>
      <Footer/>
    </>
  )
}

export default App