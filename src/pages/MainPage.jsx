import React, { useState, useEffect } from 'react';
import Row from '../components/Row';
import { getRandomWordByLength, getWordsByLength } from '../utils/utils';
const {word_length, max_attempts} = require('../config');

function MainPage() {
    const [validWords] = useState(getWordsByLength(word_length))
    const [solution] = useState(getRandomWordByLength(word_length));
    const initialValue = {
        guesses: [],
        currentGuess: "", 
        status: ""
    };
    const [guesses, setGuesses] = useState([]);
    const [currentGuess, setCurrenGuess] = useState("");
    const [status, setStatus] = useState("");

    useEffect(()=>{
        sessionStorage.setItem("solution", solution)
    },[])

    const handleInputChange = (e) => {
        const value = e.target.value.toUpperCase();
        if (value.length <= word_length && /^[A-Z]*$/.test(value)) {
            setCurrenGuess(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (currentGuess.length < word_length) {
            alert("Word length must be " + word_length);
            return;
        }

        if(currentGuess.length === word_length && !isValidWord(currentGuess)) {
            alert("Invalid Word!")
            return;
        }

        setGuesses((prev) => {
            const guess = {
                word: currentGuess,
                feedbacks: getFeedbacks(currentGuess),
            };
            return [...prev, guess];
        });
        
        setCurrenGuess("");

        if (currentGuess === solution) {
            setStatus("🎉 Congratulations! You guessed the word!");
        } else if (guesses.length + 1 === max_attempts) {
            setStatus(`❌ Game Over! The word was ${solution}.`);
        }
    };

    const handleRestart = () => {
        setGuesses(initialValue.guesses); // Reset guesses to an empty array
        setCurrenGuess(initialValue.currentGuess); // Reset currentGuess to an empty string
        setStatus(initialValue.status); // Reset status to an empty string
    };
    

    const getFeedbacks = (word) => {
        return word.split('').map((char, i) => {
            const isCorrect = solution[i] === char;
            const isPresent = !isCorrect && solution.includes(char);
            return isCorrect ? "correct" : isPresent ? "present" : "absent";
        });
    };

    const isValidWord = (word) => {
        return validWords.includes(word)
    }

    return (
        <React.Fragment>
            <style>{style}</style>
            <div className="container">
                <p>WORDLE</p>
                <div style={{ marginBottom: '20px' }}>
                    {Array.from({ length: max_attempts }).map((_, index) => (
                        <Row key={index} data={guesses[index] || {}} />
                    ))}
                </div>
                {status && <div className="status">{status}</div> }
                <form onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            disabled={status !== ""}
                            value={currentGuess}
                            onChange={handleInputChange}
                            placeholder="Type your guess"
                            maxLength={word_length}
                        />
                    </div>
                    <div className="buttons">
                        <button type="submit" disabled={status !== ""} className="btn-submit">Submit</button>
                        <button type="button" disabled={status === ""} onClick={handleRestart} className="btn-reset">Restart</button>
                    </div>
                </form>
            </div>
        </React.Fragment>
    );
}

export default MainPage;


const style = `
    p {
        font-size: 40px;
        font-weight: 600;
        letter-spacing: 5px;
    }
    .container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    input {
        width: 150px;
        padding: 10px;
        border-radius: 5px;
        border: 1px solid lightgrey;
    }

    .buttons {
        display: flex;
        justify-content: space-evenly;
        margin-top: 10px;
    }

    .status {
        margin-bottom: 10px;
    }

    button {
        padding: 5px 10px;
        border-radius: 5px;
        cursor: pointer;
        font-weight: 600;
        border: 1px solid lightgrey;
    }
`