var React = require('react');

var ListItem = React.createClass({
    render: function() {

        return (
            <li className="list-group-item">
                <h5>{this.props.ingredient}</h5>
            </li>
        );
    }
});

module.exports = ListItem;

// {} defines js code

// {this.props.ingredient} grab 
