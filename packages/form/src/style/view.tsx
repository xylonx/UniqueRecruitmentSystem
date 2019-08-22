import { createStyles, Theme } from '@material-ui/core/styles';
import bgLeft from '../asset/img/bgLeft.png';
import bgRight from '../asset/img/bgRight.png';
// import borderImg from '../asset/img/test.png';
import MyTheme from './theme';
const styles = ({ spacing, breakpoints }: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            boxSizing: 'border-box',
            minHeight: '100vh',
            fontFamily: MyTheme.font.family,
            marginRight: 'calc(100% - 100vw)',
            [breakpoints.down('xs')]: {
                flexDirection: 'column',
                alignItems: 'center'
            }
        },
        logo: {
            userSelect: 'none',
            [breakpoints.between('sm', 'md')]: {
                position: 'absolute',
                top: spacing(3),
                left: spacing(5),
                width: '25%'
            },
            [breakpoints.up('lg')]: {
                position: 'absolute',
                top: spacing(3),
                left: spacing(5),
                width: '20%'
            },
            [breakpoints.down('xs')]: {
                width: '50%',
                marginTop: spacing(4)
            }
        },
        background: {
            flex: 1,
            backgroundSize: 'contain',
            backgroundRepeat: 'repeat-Y',
            backgroundPosition: 'bottom',
            marginBottom: spacing(2),
            [breakpoints.down('xs')]: {
                display: 'none'
            }
        },
        bgLeft: {
            marginLeft: spacing(4),
            backgroundImage: `url(${bgLeft})`
        },
        bgRight: {
            marginRight: spacing(3),
            backgroundImage: `url(${bgRight})`
        },
        center: {
            flex: 3,
            [breakpoints.down('xs')]: {
                flex: 6
            },
            [breakpoints.down('md')]: {
                flex: 4
            },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            marginTop: spacing(2),
            marginBottom: spacing(2),
            '& > div': {
                width: '100%',
                height: 'auto'
            }
        },
        header: {
            width: '70%',
            [breakpoints.down('sm')]: {
                width: '80%'
            }
        },
        msg: {
            fontFamily: MyTheme.font.family,
            fontSize: '1.2vw',
            margin: `${spacing(1)}px 0`,
            fontWeight: 500,
            [breakpoints.down('xs')]: {
                fontSize: '3vw'
            },
            '& .sp': {
                fontSize: '1.5vw',
                fontWeight: 'bold',
                [breakpoints.down('xs')]: {
                    fontSize: '4vw'
                }
            },
            '& .sp1': {
                color: MyTheme.palette.primary.main
            },
            '& .sp2': {
                color: MyTheme.palette.secondary.main
            }
        },
        title: {
            textAlign: 'center',
            '& h1': {
                color: MyTheme.palette.secondary.light,
                userSelect: 'none',
                whiteSpace: 'nowrap',
                fontSize: '3vw',
                marginTop: spacing(-1),
                marginBottom: 0,
                [breakpoints.between('sm', 'md')]: {
                    marginTop: spacing(1)
                },
                [breakpoints.down('xs')]: {
                    fontSize: '8vw',
                    marginTop: spacing(2)
                }
            }
        }
    });

export default styles;
