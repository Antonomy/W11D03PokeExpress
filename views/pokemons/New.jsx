const React = require('react')
const Default = require('../layouts/Default.jsx')

class New extends React.Component {
    render() {
        return (
            <Default title="Create A New Pokemon">
                <form method="POST" action="/pokemons">
                    Name: <input type="text" name="name" />
                    Image: <input type="text" name="image" />
                    <input type="submit" value="Submit Pokemon" />
                </form>
            </Default>
        )
    }
}

module.exports=New