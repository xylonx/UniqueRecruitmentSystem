import { verifyJWT } from '../../lib/checkData';
import { formURL, GROUPS as groups, smsSendURL, token } from '../../lib/consts';
import { ObjectId } from 'mongodb';
import fetch from 'node-fetch';
import { database, redisClient, getAsync } from '../../app';
import { Request, Response } from 'express';

const generateSMS = (name: string, step: string, type: string, group: string, link?: string) => {
    if (step === '通过' && type === 'accept') {
        return {
            template: 185985,
            param_list: [name, '2018年秋季招新', group]
        };
    }
    return type === 'accept' ?
        {
            template: 185990,
            param_list: [name, '2018年秋季招新', group, step, step === '笔试流程' || step === '熬测流程' ? `，请进入以下链接选择面试时间：${link}` : '']
        }
        : {
            template: 185987,
            param_list: [name, '2018年秋季招新', group, step, '不要灰心，继续学习。期待与更强大的你的相遇！']
        }
};

export const sendCommon = (req: Request, res: Response) => {
    const body = req.body;
    const { step, type, group, title, candidates, code: userCode, date } = body;
    (async () => {
        try {
            const decoded = verifyJWT(req.get('Authorization'));
            if ([step, type, group, title, candidates, userCode].includes(undefined)
                || [step, type, group, title, candidates, userCode].includes('')
            ) {
                res.send({ message: '请完整填写信息', type: 'warning' });
                return;
            }
            const recruitment = (await database.query('recruitments', { title }))[0];
            let formId = '';
            if (date) {
                if (step === '笔试流程') {
                    formId = `${recruitment['_id']}${groups.indexOf(group)}1`;
                    await database.update('recruitments',
                        { title },
                        { time1: { ...recruitment.time1, [group]: date } }
                    );
                } else if (step === '熬测流程') {
                    formId = `${recruitment['_id']}2`;
                    await database.update('recruitments', { title }, { time2: date });
                }
            }
            const code = await getAsync(`userCode:${decoded['uid']}`);
            if (userCode === code) {
                const results = candidates.map(async (i: string) => {
                    const candidateInfo = (await database.query('candidates', { _id: new ObjectId(i) }))[0];
                    if (type === 'reject') {
                        await database.update('candidates', { _id: new ObjectId(i) }, { rejected: true })
                    }
                    const smsBody = generateSMS(candidateInfo['name'], step, type, group, date ? `${formURL}/${formId}/${i}` : '');
                    const response = await fetch(smsSendURL, {
                        method: 'POST',
                        headers: {
                            'Token': token,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            phone: candidateInfo['phone'],
                            ...smsBody
                        })
                    });
                    const result = await response.json();
                    if (result.code !== 200) {
                        return candidateInfo['name'];
                    }
                });
                Promise.all(results).then(failed => {
                    const failedNames = failed.filter(i => i);
                    failedNames.length === 0
                        ? res.send({ type: 'success' })
                        : res.send({ type: 'info', message: `未能成功发送短信的有：${failedNames}` })
                });
                redisClient.del(`userCode:${decoded['uid']}`);
            } else {
                res.send({ message: '验证码不正确', type: 'warning' })
            }
        } catch (err) {
            res.send({ message: err.message, type: 'danger' })
        }
    })()
};