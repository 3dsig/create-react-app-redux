import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import * as counterSelector from '../state/home/home_selector'
import { connect } from 'react-redux'
import Home from '../components/home/home'
import
{
    increment,
    incrementAsync,
    decrement,
    decrementAsync
} from '../state/home/home_actions';

const mapStateToProps = state => ({
    count: counterSelector.count(state),
    isIncrementing: counterSelector.isIncrementing(state),
    isDecrementing: counterSelector.isDecrementing(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({
    increment,
    incrementAsync,
    decrement,
    decrementAsync,
    changePage: () => push('/about-us')
}, dispatch);

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home)
