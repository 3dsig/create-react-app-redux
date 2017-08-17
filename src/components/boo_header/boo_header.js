/**
 * Created by shahartaite on 07/09/2016.
 */
import React, {PureComponent} from 'react';
import BooLogo from '../boo_logo/boo_logo';
//import BooSearchBar from 'js/containers/search_bar_container';
import styles from './boo_header.css';
import UserMenu from '../../containers/user_menu_container';
class BooHeader  extends PureComponent {
  
  render(){
    return (
      <div className={styles.fullHeader}>
          <BooLogo/>
          {/*<UserMenu userEmail={this.props.userEmail}/>*/}
      </div>
    );
  }
}

export default BooHeader;
