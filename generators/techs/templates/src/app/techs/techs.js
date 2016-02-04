var React = require('react');
var axios = require('axios');

var styles = {
  container: {
    margin: '1rem'
  },
  h2: {
    fontWeight: 300,
    fontSize: '1.5rem'
  },
  techs: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around'
  }
}

module.exports = React.createClass({
  getInitialState: function() {
    return { techs: [] };
  },

  componentDidMount: function () {
    axios
      .get('app/techs/techs.json')
      .then(response => {
        this.setState({ techs: response.data });
      });
  },

  render: function () {
    return (
      <div style={styles.container}>
        <h2 style={styles.h2}>
          Cooked with all these awesome technologies:
        </h2>
        <div style={styles.techs}>
          {this.state.techs.map((tech, i) => (
            <Tech key={i} tech={tech}/>
          ))}
        </div>
      </div>
    );
  }
});
