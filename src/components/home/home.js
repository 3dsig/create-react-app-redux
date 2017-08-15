import React, {Component} from 'react';

class Home extends Component {

    render() {
        return (
            <div>
                <h1>Home</h1>
                <p>Count: {this.props.count}</p>

                <p>
                    <button onClick={this.props.increment} disabled={this.props.isIncrementing}>Increment</button>
                    <button onClick={this.props.incrementAsync} disabled={this.props.isIncrementing}>Increment Async</button>
                </p>

                <p>
                    <button onClick={this.props.decrement} disabled={this.props.isDecrementing}>Decrementing</button>
                    <button onClick={this.props.decrementAsync} disabled={this.props.isDecrementing}>Decrement Async</button>
                </p>

                <p><button onClick={() => this.props.changePage()}>Go to about page via redux</button></p>
            </div>
        )
    }

}


Home.propTypes = {
    // passed from parent Component

    // attached to state (passed from container)

    // configured on the container at mapDispatchToProps
}

export default Home


