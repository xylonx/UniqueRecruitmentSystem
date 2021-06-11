import { set } from 'idb-keyval';
import { makeAutoObservable, toJS } from 'mobx';

import { STEP_MAP } from '@config/consts';
import { Group, InterviewType, Step, StepType } from '@config/enums';
import { Application, Comment } from '@config/types';
import { groupSort, teamSort } from '@utils/sort';

const allSteps = [
    Step.报名,
    Step.笔试,
    Step.组面时间选择,
    Step.组面,
    Step.熬测,
    Step.群面时间选择,
    Step.群面,
    Step.通过,
];
const teamInterviewSteps = [Step.群面, Step.通过];
const groupInterviewSteps = [Step.组面, Step.熬测];

export class ApplicationStore {
    applications = new Map<string, Application>();

    selected = new Map<string, Application>();

    group = Group.web;

    stepType = StepType.all;

    steps: Step[] = allSteps;

    constructor() {
        makeAutoObservable(this);
    }

    addComment(cid: string, comment: Comment) {
        const application = this.applications.get(cid);
        if (!application) {
            return;
        }
        application.comments.push(comment);
        void set('applications', toJS(this.applications));
    }

    removeComment(cid: string, commendId: string) {
        const application = this.applications.get(cid);
        if (!application) {
            return;
        }
        application.comments = application.comments.filter(({ id }) => id !== commendId);
        void set('applications', toJS(this.applications));
    }

    setOne(application: Application) {
        this.applications.set(application.id, application);
        void set('applications', toJS(this.applications));
    }

    setMany(applications: Application[]) {
        for (const application of applications) {
            this.applications.set(application.id, application);
        }
        this.deselectAll();
        void set('applications', toJS(this.applications));
    }

    setAll(applications: Map<string, Application>) {
        this.applications = applications;
        this.deselectAll();
        void set('applications', toJS(this.applications));
    }

    clear() {
        this.applications.clear();
    }

    selectOne(cid: string) {
        this.selected.set(cid, this.applications.get(cid)!);
    }

    selectMany(cids: string[]) {
        for (const cid of cids) {
            this.selectOne(cid);
        }
    }

    deselectOne(cid: string) {
        this.selected.delete(cid);
    }

    deselectMany(cids: string[]) {
        for (const cid of cids) {
            this.deselectOne(cid);
        }
    }

    deselectAll() {
        this.selected.clear();
    }

    removeOne(cid: string) {
        this.applications.delete(cid);
        this.deselectOne(cid);
        void set('applications', toJS(this.applications));
    }

    moveOne(cid: string, to: Step) {
        const application = this.applications.get(cid);
        if (!application) {
            return;
        }
        this.deselectOne(cid);
        application.step = to;
        void set('applications', toJS(this.applications));
    }

    setGroup(group: Group) {
        this.deselectAll();
        this.group = group;
    }

    setSteps(stepType: StepType, steps?: Step[]) {
        this.deselectAll();
        this.stepType = stepType;
        if (steps) {
            this.steps = steps;
        } else {
            switch (stepType) {
                case StepType.all:
                    this.steps = allSteps;
                    break;
                case StepType.groupInterview:
                    this.steps = groupInterviewSteps;
                    break;
                case StepType.teamInterview:
                    this.steps = teamInterviewSteps;
                    break;
            }
        }
    }

    allocateOne(type: InterviewType, cid: string, time: Date) {
        const application = this.applications.get(cid);
        if (!application) {
            return;
        }
        application.interviewAllocations[type] = time;
        void set('applications', toJS(this.applications));
    }

    allocateMany(allocations: { aid: string; time?: Date }[], type: InterviewType) {
        allocations.forEach(({ aid, time }) => {
            const application = this.applications.get(aid);
            if (!application) {
                return;
            }
            application.interviewAllocations[type] = time;
        });
        void set('applications', toJS(this.applications));
    }

    get groupBySteps() {
        const applications: Application[][] = [...new Array<unknown>(STEP_MAP.size)].map(() => []);
        switch (this.stepType) {
            case StepType.all:
            case StepType.groupInterview:
                for (const [, application] of this.applications) {
                    if (application.group === this.group) {
                        applications[application.step].push(application);
                    }
                }
                break;
            case StepType.teamInterview:
                for (const [, application] of this.applications) {
                    applications[application.step].push(application);
                }
                break;
        }
        applications[Step.组面].sort(groupSort);
        applications[Step.群面].sort(teamSort);
        return applications;
    }
}