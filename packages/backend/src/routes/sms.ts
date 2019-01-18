import express from 'express';
import { authenticator } from '../middlewares/authenticator';

import {
    sendCandidateCode, sendCandidateCodeVerify,
    // sendInterview,
    // sendNext,
    sendUserCode
} from '../actions/sms';
// import { codeChecker } from '../middlewares/codeChecker';

const router = express.Router();

// request for verification code
router.get('/verification/candidate/:phone', sendCandidateCodeVerify, sendCandidateCode);

router.use(authenticator);

// request for verification code
router.get('/verification/user', sendUserCode);

// // send notification sms
// router.post('/', codeChecker('user'), sendNext);
//
// // send sms after all interview time has been arranged
// router.post('/interview', sendInterview);

export const sms = router;
