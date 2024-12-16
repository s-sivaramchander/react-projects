import React, { useEffect, useState } from 'react';
import { word_length } from '../config';

function Row({ data = {} }) {
    const [cells, setCells] = useState(new Array(word_length).fill(null));

    useEffect(() => {
      if (!data.word) {
          setCells(new Array(5).fill(null));
      } else {
          const charsInWord = data.word.toUpperCase().split('');
          const updatedCells = charsInWord.map((char, i) => ({
              char,
              feedback: data.feedbacks?.[i] || 'absent',
          }));
          setCells(updatedCells);
      }
  }, [data]);

    return (
        <React.Fragment>
            <style>{style}</style>
            <div className="row-container">
                {cells.map((cell, i) => (
                    <div className={`cell ${cell?.feedback}`} key={i}>
                      {cell?.char}
                    </div>
                ))}
            </div>
        </React.Fragment>
    );
}

export default Row;


const style = `
  .row-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }

  .cell {
    margin: 2px;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 30px;
    font-weight: 600;
    background-color: white;
    padding: 10px;
    width: 35px;
    height: 35px;
    border: 1px solid lightgrey;
  }

  .correct {
    background-color: #538D4E;
  }

  .present {
    background-color: orange;
  }

  .absent {
    background-color: #3A3A3F;
  }
`