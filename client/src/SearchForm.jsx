import React from 'react'

const SearchForm = (props) => {
    const [player, setPlayer] = React.useState("")

    const handleSubmit = (event) => {
        event.preventDefault();
        const params = {
            name: player
        }
        props.parentCallback(params);
    }

    const setter = (event) => {
        setPlayer(event.target.value)
    }
    return (
        <form onSubmit={handleSubmit} className="search-form">
            <input type="text" className="form-control rounded" value={player} aria-label="Search" aria-describedby="search-addon" onChange={setter} />
            <input type="submit" className="btn btn-outline-primary" value="Submit" />
        </form>
    )
}

export default SearchForm