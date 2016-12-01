import React, { Component } from 'react';
import Header from './Header';
import TimelineContainer from './Timeline';

class Home extends Component {
  render() {          
    return (
      <div className="main">
        <Header store={this.context.store}/>
        <TimelineContainer login={this.props.params.login} />
      </div>
    );
  }
}

Home.contextTypes = {
  store: React.PropTypes.object.isRequired,
};

export default Home;
