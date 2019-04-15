import React, { Component } from 'react';
import styled from '@emotion/styled'
import moment from 'moment'

const Table = styled('div')`
    width: 100%;

    h4 {
        color:white;
    }

    div {
        :first-of-type {
            border-radius: 4px 4px 0 0;
        }
        :hover {
            font-weight: bold;
        }
        :last-child {
            border-radius: 0 0 4px 4px;
        }
    }
`

const Game = styled('div')`
    background-color: white;
    border: 1px solid gray;
    display:flex;
    padding: 5px;
    cursor: pointer;

    div {
        width: 150px;
    }
`

const Arrow = styled('div')`
    font-size:20px;
    width: 40px;
`

class Schedule extends Component {
    state = {}

    buildGame = game => {
        const { onGameClick } = this.props

        return (
            <Game key={game.id} onClick={() => onGameClick(game.id)}>
                <Arrow>⇣⇡</Arrow>
                <div>{game.tracks[0].id}</div>
                <div>{game.tracks[0].name}</div>
                <div>{moment(game.startTime).format('MM-DD-YYYY HH:mm')}</div>
            </Game>
        )
    }

    render() {
        const { gameSchedule } = this.props
        if (!gameSchedule) return null

        return (
            <div>
                <Table>
                    <h4>Tidigare tävlingar - {gameSchedule.betType}</h4>
                    {gameSchedule && gameSchedule.results.map(game => (
                        this.buildGame(game)
                    ))}
                </Table>
                <Table>
                    <h4>Kommande tävlingar - {gameSchedule.betType}</h4>
                    {gameSchedule && gameSchedule.upcoming.map(game => (
                        this.buildGame(game)
                    ))}
                </Table>
            </div>
        )
    }
}

export default Schedule;
