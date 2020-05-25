import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'umi';
import styles from './logo.less';


import './logo.less';

function Logo(props) {
    const {
        title, className, style, theme, logo, collapsed
    } = props;

    let content = null;
    if (logo.img) {
        content = <img src={logo.img} />;
    } else {
        content = (
            <>
                <span className={styles.title} style={logo.logoText}>
                    {title}
                </span>
            </>
        );
    }


    return (
        <Link
            to="/"
            className={styles.container}
            style={{ background: logo.background, ...style }}>
            <div className={styles.logo}>{content}</div>
        </Link>
    );
}

Logo.propTypes = {
    className: PropTypes.string,
    collapsed: PropTypes.bool,
    style: PropTypes.shape({}),
    title: PropTypes.string,
    logo: PropTypes.shape({}),
    subTitle: PropTypes.string,
    iconInTitle: PropTypes.string,
    theme: PropTypes.oneOf(['dark', 'light', 'transparent'])
};

Logo.defaultProps = {
    collapsed: false,
    className: '',
    style: {},
    subTitle: null,
    logo: {},
    title: '',
    iconInTitle: '',
    theme: 'light'
};

export default Logo;
