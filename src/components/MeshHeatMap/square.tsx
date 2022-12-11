
import React from 'react'
import {createUseStyles} from 'react-jss'


type Props = {
  sideSize: number,
  color: string,
  onClick: () => void,
  x: number,
  y: number,
}

const Square: React.FC<Props> = ({
  sideSize,
  color
})=>{

  const useStyle = createUseStyles({
    squre: {
      height: sideSize,
      width: sideSize,
      backgroundColor: color,
      opacity: 0.8,
      transition: 'opacity 300ms',
      borderRadius: 10,
      '&:hover': {
        cursor: 'pointer',
        opacity: 1,
      }
    }
  })
  const classes = useStyle()

  return <div><div className={classes.squre}/></div>
}


export default Square