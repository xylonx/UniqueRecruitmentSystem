import React, { PureComponent } from 'react';

import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';

import withRoot from '../style/withRoot';

import User from '../container/User';

class MyInfo extends PureComponent<WithStyles> {
    render() {
        return <User />;
    }
}

export default withRoot(withStyles({})(MyInfo));
