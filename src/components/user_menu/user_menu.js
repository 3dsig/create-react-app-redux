/**
 * Created by shahartaite on 28/12/2016.
 */
import React, {Component} from 'react';
import DropdownMenu, {NestedDropdownMenu} from 'react-dd-menu';
import userIconSrc from '../../images/login/user.svg';
import styles from './user_menu.css';
import PropTypes from 'prop-types';

class UserMenu extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isMenuOpen: false
        };
        this.toggle = this.toggle.bind(this);
        this.close = this.close.bind(this);
        this.timeZoneClicked = this.timeZoneClicked.bind(this);
    }

    shouldComponentUpdate(nextProps, nextState) {
        const userEmailChanged = this.props.userEmail !== nextProps.userEmail;
        const isMenuOpenChanged = this.state.isMenuOpen !== nextState.isMenuOpen;
        return userEmailChanged || isMenuOpenChanged;
    }

    toggle() {
        this.setState({isMenuOpen: !this.state.isMenuOpen});
    }

    close() {
        this.setState({isMenuOpen: false});
    }


    timeZoneClicked(timezone) {
        this.toggle();
        this.props.timeZoneClicked(timezone);
    }

    render() {
        let menuOptions = {
            isOpen: this.state.isMenuOpen,
            close: this.close,
            toggle: <div onClick={this.toggle} className={styles.userMenuContainer}>
                <img src={userIconSrc} className={styles.userIcon} alt=""/>
                <div className={styles.userName}>{this.props.userEmail}</div>
            </div>,
            align: 'center',
            menuAlign: 'center',
            nested: 'reverse',
            openOnMouseover: true
        };


        const timezoneSubMenuProps = {
            toggle: <a>{this.props.selectedTimezone}</a>,
            animate: true,
        };
        const possibleTimezones = ['Asia/Jerusalem', 'Europe/Rome', 'America/Los_Angeles'];
        const timezoneListItems = possibleTimezones.map((timezone) => {
            return <li key={timezone} onClick={() => this.timeZoneClicked(timezone)}><span>{timezone}</span></li>;
        });

        return (
            <DropdownMenu {...menuOptions}>
                <li>
                    <a onClick={this.props.logout}>
                        Logout
                    </a>
                </li>
                <NestedDropdownMenu {...timezoneSubMenuProps}>
                    {timezoneListItems}
                </NestedDropdownMenu>
            </DropdownMenu>
        );
    }
}
;
UserMenu.propTypes = {
    timeZoneClicked: PropTypes.func.isRequired,
    userEmail: PropTypes.string.isRequired,
    selectedTimezone: PropTypes.func.isRequired,
    logout: PropTypes.func.isRequired,
}
export default UserMenu;
