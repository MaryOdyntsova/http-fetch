var React = require('react');
var ListItem = require('./ListItem.jsx');
var Reflux = require('reflux');
var Actions = require('../reflux/actions.jsx');
var IngredientStore = require('../reflux/ingredients-store.jsx')

var List = React.createClass({
    mixins: [Reflux.listenTo(IngredientStore,  'onChange')],
    //we listening to the changes in the store
    //function what we call for the change onChange
    getInitialState: function() {
        return {ingredients:[], newText: ''};
    },
    componentWillMount: function() {
        Actions.getIngredients();
    },
    onChange: function(event, ingredients) {
      //ingredients its just the data grabs from the store
      //whitch got them from te server
      this.setState({ingredients: ingredients});
    },
    onInputChange: function(e) {
      this.setState({newText: e.target.value});
    },
    onClick: function(e) {
      if (this.state.newText) {//make sure its not null
        Actions.postIngredients(this.state.newText);
      }
      this.setState({newText: ''});
    },
    render: function() {
        var listItems = this.state.ingredients.map(function(item) {
            return <ListItem key={item.id} ingredient={item.text} />;
        });

        var containerStyle = {
          width: 500,
          background: "#cff",
          paddingBottom: 20,
          borderRadius: 10,
          marginTop: 20
        }
        var inputGroupStyle = {
          paddingTop: 20,
          paddingBottom: 20
        }

        return (
          <div className="container" style={containerStyle}>
            <div className="input-group" style={inputGroupStyle}>
              <input
              type="text"
              className="form-control"
              placeholder="Enter new ingredient"
              value={this.state.newText}
              onChange={this.onInputChange} />
              <button className="btn btn-info"
                      onClick={this.onClick}>Add item</button>
            </div>
              <ul className="list-group">{listItems}</ul>
          </div>
        );
    }
});

module.exports = List;
