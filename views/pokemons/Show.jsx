const React = require('react')
const Default = require('../layouts/Default.jsx')

class Show extends React.Component {
    render() {
        const {name, _id, image} = this.props.pokemon
    return(
        <Default title={`${name} Show Page`} pokemon={this.props.pokemon}>
            <img src={`${image}`} alt={`Image of ${name}`} />
        </Default>
    
    )
    }
}

module.exports = Show