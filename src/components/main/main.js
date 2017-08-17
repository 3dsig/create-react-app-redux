import React, {Component} from 'react';
import BooHeader from '../boo_header/boo_header';

class Main extends Component {

    componentDidMount(){
        fetch('/measurements/test');
        console.log('fetching')
    }
    
    render() {
        return (
            <div>
                <BooHeader/>

            </div>
        )
    }

}


Main.propTypes = {
    // passed from parent Component

    // attached to state (passed from container)

    // configured on the container at mapDispatchToProps
}

export default Main


