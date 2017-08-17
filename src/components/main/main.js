import React, {Component} from 'react';
import styles from './main.css';
import BooHeader from '../boo_header/boo_header';
import UserMenu from "../user_menu/user_menu";

class Main extends Component {

    render() {
        return (
            <div className={styles.mainDiv}>
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


