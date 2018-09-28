import React, { PureComponent } from 'react';
import withStyles, { WithStyles } from '@material-ui/core/styles/withStyles';
import styles from '../../style/group';
import withRoot from "../../style/withRoot";
import { Candidate, Recruitment, Time, User } from '../../lib/const';
import GroupDialog from './GroupDialog';
import GroupMembers from "./GroupMembers";
import GroupCandidates from "./GroupCandidates";
import GroupModal from "./GroupModal";

interface Props extends WithStyles {
    candidates: Map<string, Candidate>[];
    group: User[];
    userGroup: string;
    currentRecruitment: Recruitment;
    requestCandidate: (group: string) => void;
    requestGroup: (group: string) => void;
    requestRecruitments: () => void;
    sendInterview: (content: object) => void;
    toggleSnackbar: (message: string, color: string) => void;
    submit: (title: string, slots: number[], group: string) => void;
}

class Group extends PureComponent<Props> {

    state = {
        interviewStage: 1,
        counts: [] as number[][],
        modalOpen: false,
        dialogOpen: false,
        code: '',
        place: ''
    };

    initTime = (time: Time[]) => {
        this.setState({
            counts: time.map(i =>
                [i.morning ? 0 : -1, i.afternoon ? 0 : -1, i.evening ? 0 : -1]
            )
        })
    };

    handleChange = (event: React.ChangeEvent) => {
        const interviewStage = event.target['value'];
        const { requestCandidate, userGroup: group } = this.props;
        this.setState({
            interviewStage,
            counts: []
        });
        interviewStage === 1 ? requestCandidate(group) : requestCandidate('interview');
    };

    handleSelect = (i: number, j: number) => (event: React.ChangeEvent) => {
        const counts = [...this.state.counts];
        counts[i] = counts[i] || [];
        counts[i][j] = Math.max(event.target['value'], 1);
        this.setState({
            counts
        })
    };

    handleInput = (name: string) => (event: React.ChangeEvent) => {
        this.setState({
            [name]: event.target['value'],
        });
    };

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    };

    toggleDialog = () => {
        this.setState({
            dialogOpen: !this.state.dialogOpen
        })
    };

    submitAllocation = () => {
        const { toggleSnackbar, candidates, currentRecruitment, submit, userGroup: group } = this.props;
        const { counts, interviewStage } = this.state;
        const candidateNumbers = candidates.map(i => [...i.values()])[interviewStage === 1 ? 2 : 4].filter(i => !i.abandon).length;
        let total = 0;
        let message = '';
        counts.map(i => {
            i.map(j => {
                if (j === 0) {
                    message = '每个时间段必须分配候选人';
                    return;
                } else if (j !== -1) {
                    total += j;
                }
            })
        });
        if (total < candidateNumbers) {
            message = `分配人数不能小于当前候选人数量(${candidateNumbers})`;
        }
        if (message) {
            toggleSnackbar(message, 'info');
            return;
        }
        const slots = counts.reduce((i, j) => [...i, ...j]);
        submit(currentRecruitment.title, slots, interviewStage === 1 ? group : 'interview');
        this.toggleModal();
    };

    sendInterview = (candidates: string[]) => () => {
        const { code, interviewStage, place } = this.state;
        this.props.sendInterview({
            code,
            interviewStage,
            candidates,
            place
        });
        this.toggleDialog();
    };

    componentDidMount() {
        const { requestCandidate, requestGroup, requestRecruitments, toggleSnackbar, userGroup } = this.props;
        if (userGroup) {
            requestCandidate(userGroup);
            requestGroup(userGroup);
            requestRecruitments();
        } else {
            toggleSnackbar('请先完善个人信息！', 'warning');
        }
    }

    componentDidUpdate() {
        const { currentRecruitment, userGroup } = this.props;
        const { interviewStage, counts } = this.state;
        if (currentRecruitment && !counts.length) {
            const { time1, time2 } = currentRecruitment;
            if (interviewStage === 1 && time1) {
                this.initTime(time1[userGroup]);
            } else if (interviewStage === 2 && time2) {
                this.initTime(time2);
            }
        }
    }

    render() {
        const { classes, candidates, group, currentRecruitment, userGroup } = this.props;
        const { interviewStage, counts, modalOpen, code, dialogOpen, place } = this.state;
        if (!userGroup) {
            return <></>;
        }
        const disabled = interviewStage === 1
            ? !(candidates[2] && candidates[2].size && currentRecruitment && currentRecruitment.time1 && currentRecruitment.time1[userGroup] && counts.length)
            : !(candidates[4] && candidates[4].size && currentRecruitment && currentRecruitment.time2 && counts.length);
        const currentCandidates = candidates.length ? candidates.map(i => [...i.values()])[interviewStage * 2] : [];
        const filteredCandidates = currentCandidates.filter(i => (!i.abandon && !i.rejected && i[`time${interviewStage}`] && i[`slot${interviewStage}`]));
        return (
            <div className={classes.infoContainer}>
                <GroupMembers group={group}/>
                <GroupCandidates
                    candidates={currentCandidates}
                    interviewStage={interviewStage}
                    disabled={disabled}
                    toggleModal={this.toggleModal}
                    toggleDialog={this.toggleDialog}
                    handleChange={this.handleChange}
                />
                <GroupDialog
                    dialogOpen={dialogOpen}
                    toggleDialog={this.toggleDialog}
                    handleInput={this.handleInput}
                    code={code}
                    place={place}
                    sendInterview={this.sendInterview(filteredCandidates.map(i => i._id))}
                    candidates={filteredCandidates.map(i => i.name)}
                />
                {!disabled && <GroupModal
                    userGroup={userGroup}
                    currentRecruitment={currentRecruitment}
                    interviewStage={interviewStage}
                    counts={counts}
                    modalOpen={modalOpen}
                    handleSelect={this.handleSelect}
                    submitAllocation={this.submitAllocation}
                    toggleModal={this.toggleModal}
                />}
            </div>
        )
    }
}

export default withRoot(withStyles(styles)(Group));