import React, { Component, Fragment } from 'react';
import { DotLoader } from 'react-spinners'
import styled from '@emotion/styled'
import moment from 'moment'

const Table = styled('div')`
    width: 100%;
    margin-bottom: 20px;
    background-color: white;
    border-radius: 0px 0px 4px 4px;

    div:last-child {
        border: none;
    }
`

const TableHeader = styled('div')`
    display:flex;
    padding: 5px;
    background-color: #0c0c0c;
    color: white;
    
    div {
        width: 200px;

        :first-of-type {
            width: 50px;
        }
    }
`

const Start = styled('div')`
    display:flex;
    padding: 5px;
    cursor: pointer;
    
    :hover {
        font-weight: bold;
    } 
    
    div {
        width: 200px;

        :first-of-type {
            width: 50px;
        }
    }
`

const RaceHeader = styled('div')`
    align-items:center;
    display: flex;
    justify-content: space-between;
    background: white;
    border-radius: 4px 4px 0 0;
    padding: 0 10px;
    font-size: 18px;
    background-color: #2965af;
    color: white;
    height: 50px;
}
`

const Loader = styled('div')`
    display: flex;
    justify-content: center;
    height: 400px;
    align-items: center;
`

const Divider = styled('div')`
    border-bottom: 1px solid black;
    opacity: .9;
    margin: 0 10px 0 10px;
`

const Extra = styled('div')`
    margin: 0 0 10px 55px;
    font-size: 14px;
    
    &:hover {
        font-weight: 0;
    }
    
    em:first-of-type {
        margin-right: 5px;
    }
`

export default class Game extends Component {
    state = { showExtraId: '' }

    toggleExtra = id => {
        const { showExtraId } = this.state
        const activeId = showExtraId === id ? '' : id

        this.setState({ showExtraId: activeId })
    }

    buildStart = (start, race) => {
        const { showExtraId } = this.state
        const customId = `${start.number}_${race.number}`

        return (
            <Fragment key={customId}>
                <Start onClick={() => this.toggleExtra(customId)}>
                    <div># {start.number}</div>
                    <div>{start.horse.name}</div>
                    <div>{start.driver.firstName} {start.driver.lastName}</div>
                </Start>
                {showExtraId === customId &&
                    <Extra>
                        <div><em>Trainer: {start.horse.trainer.firstName} {start.horse.trainer.lastName}</em></div>
                        <div><em>Horse father: {start.horse.pedigree.father.name}</em></div>
                    </Extra>
                }
                <Divider />
            </Fragment>
        )
    }

    render() {
        const { gameData, loading } = this.props

        if (loading) {
            return (
                <Loader>
                    <DotLoader />
                </Loader>
            )
        }

        if (!gameData) return null

        return (
            <div>
                {gameData.races.map(race => (
                    <div key={race.number}>
                        <RaceHeader>
                            <div>{race.number}</div>
                            <div>{race.name != null ? race.name : 'n/a'}</div>
                            <div>{moment(race.scheduledStartTime).format('MM-DD-YYYY HH:mm')}</div>
                        </RaceHeader>
                        <TableHeader>
                            <div></div>
                            <div><em>Namn</em></div>
                            <div><em>Ryttare</em></div>
                        </TableHeader>
                        <Table>
                            {race.starts.map(start => (
                                this.buildStart(start, race)
                            ))}
                        </Table>
                    </div>
                ))}
            </div>
        )
    }
}
