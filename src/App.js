import React, { Component } from 'react';
import Schedule from './components/Schedule'
import Header from './components/Header'
import Game from './components/Game'
import styled from '@emotion/styled'

const Container = styled('div')`
  display:flex;
  justify-content: center;
`

const Wrapper = styled('div')`
  max-width: 1000px;
  width: 100%;
  margin-top: 100px;
`

class App extends Component {

  state = {
    gameSchedule: null,
    loadingSchedule: false,
    gameData: null,
    loadingGame: false
  }

  getScheduleData = async (e, game) => {
    e.preventDefault()
    this.setState({ loadingSchedule: true })

    await fetch(`services/racinginfo/v1/api/products/${game}`)
      .then(response => response.json())
      .then(gameSchedule => this.setState(
        {
          gameSchedule,
          gameData: null,
          loadingSchedule: false
        }
      ))
      .catch(() => this.setState({ loadingSchedule: false }))
  }

  getGameData = async id => {
    this.setState({ loadingGame: true })

    await fetch(`services/racinginfo/v1/api/games/${id}`)
      .then(response => response.json())
      .then(gameData => this.setState(
        {
          gameData,
          loadingGame: false
        }
      ))
      .catch(() => this.setState({ loadingGame: false }))
  }

  render() {
    const { gameSchedule, gameData, loadingGame, loadingSchedule } = this.state
    const displaySchedule = !gameData && !loadingGame

    return (
      <Container>
        <Wrapper>
          <Header onSearch={this.getScheduleData} loading={loadingSchedule} />
          {displaySchedule && <Schedule onGameClick={this.getGameData} gameSchedule={gameSchedule} />}
          <Game gameData={gameData} loading={loadingGame} />
        </Wrapper>
      </Container>
    )
  }
}

export default App;
