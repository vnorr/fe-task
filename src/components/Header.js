import React, { Component } from 'react';
import styled from '@emotion/styled'
import { DotLoader } from 'react-spinners'
import atg from '../atg.png'

const Container = styled('div')`
    display: flex;
    justify-content: space-between;
    height: 65px;
    margin: 20px 0;

    img {
        height: 65px;
        width: auto;
    }
`

const Search = styled('form')`
    width: 300px;
    display: flex;
    outline: none;

    input {
        width: 100%;
        border-radius: 4px 0 0 4px;
        border: 0;
        padding: 10px;
        font-size: 18px;
        outline: none;
    }

    button {
        border-radius: 0 4px 4px 0;
        border-left: 1px solid gray;
        border-top:0;
        border-right:0;
        border-bottom:0;
        width: 100px;
        outline: none;
        font-size: 18px;
        justify-content: center;
        display: flex;
        cursor: pointer;
    }
`



export default class Header extends Component {
    state = { searchQuery: '' }

    render() {
        const { searchQuery } = this.state
        const { onSearch, loading } = this.props
        const validGames = ['V75', 'V65', 'V64', 'V4']
        const isValidGame = validGames.indexOf(searchQuery) === -1

        return (
            <Container>
                <img src={atg} alt='atg-logo' />
                <Search onSubmit={(e) => onSearch(e, searchQuery)}>
                    <input autoFocus value={searchQuery} onChange={(e) => this.setState({ searchQuery: e.target.value.toUpperCase() })} type="text" placeholder="Sök spel. t.ex. V75" />
                    <button type='submit' disabled={isValidGame}>
                        {!loading ? 'Sök' : <DotLoader size={15} />}
                    </button>
                </Search>
            </Container>
        )
    }
}
