import React, {component} from 'react';
import PropTypes from 'prop-types';
import './loading.less';

function Loading(props) {
    return (
        <div className="wx-loading">
            <div className="content">
                <img src={require('../../images/rings.svg')} />
                <p>{props.loadingText}</p>
            </div>
        </div>
    )
}

Loading.defaultProps = {
    loadingText: '加载中'
}
Loading.propTypes = {
    loadingText: PropTypes.string.isRequired
}

export default Loading