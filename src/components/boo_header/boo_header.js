/**
 * Created by shahartaite on 07/09/2016.
 */
import React, {PureComponent} from 'react';
import BooLogo from '../boo_logo/boo_logo';
//import BooSearchBar from 'js/containers/search_bar_container';
import styles from './boo_header.css';
//import UserMenu from 'js/containers/user_menu_container';
class BooHeader  extends PureComponent {
  
  render(){
    return (
      <div className={styles.fullHeader}>
            <span className={styles.logoContainer}>
                <BooLogo/>
            </span>
        <span className={styles.autoCompleteContainer}>
            {/*<BooSearchBar/>*/}
            </span>
        {/*<UserMenu userEmail={this.props.userEmail}/>*/}
      </div>
    );
  }
}

export default BooHeader;
