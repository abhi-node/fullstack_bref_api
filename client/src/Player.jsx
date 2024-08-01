import React from 'react'

const Player = (props) => {
    const player = props.player

    return (
        <>
            <img className="rounded mx-auto d-block" width="150px" src={player.image} />
            <ul className="list-group list-group-flush text-center stats-list">
                <li className="list-group-item">Games: {player.games}</li>
                <li className="list-group-item">PTS/G: {player.points}</li>
                <li className="list-group-item">TRB/G: {player.trb}</li>
                <li className="list-group-item">AST/G: {player.ast}</li>
                <li className="list-group-item">STL/G: {player.stl}</li>
                <li className="list-group-item">BLK/G: {player.blk}</li>
            </ul>
        </>
    )
}

export default Player