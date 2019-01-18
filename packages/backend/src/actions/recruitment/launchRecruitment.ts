import { RequestHandler } from 'express';
import { body, validationResult } from 'express-validator/check';

import { io } from '../../app';
import { GROUPS_ } from '../../config/consts';
import { RecruitmentRepo, UserRepo } from '../../database/model';

export const launchRecruitment: RequestHandler = async (req, res, next) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return next({ message: errors.array(), type: 'warning' });
        }
        const user = await UserRepo.queryById(res.locals.id);
        if (!user) {
            return next({ message: 'User doesn\'t exist!', type: 'warning' });
        }
        const { isAdmin, isCaptain } = user;
        if (!isAdmin && !isCaptain) {
            return next({ message: 'Permission denied', type: 'warning' });
        }
        const { title, begin, end } = req.body;

        await RecruitmentRepo.createAndInsert({
            title,
            begin,
            end,
            groups: GROUPS_.map((name) => ({ name })),
        });
        res.json({ type: 'success' });
        io.emit('updateRecruitment');
    } catch (error) {
        return next(error);
    }
};

export const launchRecruitmentVerify = [
    body('title').matches(/\d{4}[ASC]/g).withMessage('Title is invalid!')
        .custom(async (title) =>
            !(await RecruitmentRepo.query({ title })).length
        ).withMessage('Current recruitment has already been launched!'),
    body('begin').isString().withMessage('Begin time is invalid!')
        .custom((begin, { req }) => begin < req.body.end).withMessage('End time should be earlier than begin time'),
    body('end').isString().withMessage('End time is invalid!')
        .custom((end, { req }) => end > req.body.begin).withMessage('End time should be earlier than begin time'),
];