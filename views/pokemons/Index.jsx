const React = require('react')
const Pokemon = require('../../models/pokemon.js')
const Default = require('../layouts/Default.jsx')

class Index extends React.Component {
    render() {
        const {pokemons} = this.props
        return(
            <Default title="Pokemon Index Page">
                <ul>
                    {
                        pokemons.map((pokemon) => {
                            const { name, _id } = pokemon
                            return (
                                <li key={_id}>
                                    <a href={`/pokemons/${_id}`}>
                                        {name}
                                    </a> <br />
                                <form method="POST" action={`/pokemons/${_id}?_method=DELETE`}>
                                    <input type="submit" value={`Delete ${name}`} />
                                </form>
                                </li>
                            )
                        })
                    }
                </ul>
            </Default>
        )
    }
}

module.exports = Index