'use strict';

import Piano from './Piano.js';

X('oscillator').setup(true);

window.customElements.define('x-piano', Piano);

const oneshots = [
    'oneshots/C.wav',
    'oneshots/D.wav',
    'oneshots/E.wav',
    'oneshots/F.wav',
    'oneshots/G.wav',
    'oneshots/A.wav',
    'oneshots/B.wav',
];

const getBufferIndex = pianoIndex => {
    switch (parseInt(((pianoIndex + 9) % 12), 10)) {
        case  0:
        case  1:
            return 0;
        case  2:
        case  3:
            return 1;
        case  4:
            return 2;
        case  5:
        case  6:
            return 3;
        case  7:
        case  8:
            return 4;
        case  9:
        case 10:
            return 5;
        case 11:
            return 6;
        default:
            break;
    }
};

const calculateRate = pianoIndex => {
    const sharps  = [1, 4, 6, 9, 11, 13, 16, 18, 21, 23, 25, 28, 30, 33, 35, 37, 40, 42, 45, 47, 49, 52, 54, 57, 59, 61, 64, 66, 69, 71, 73, 76, 78, 81, 83, 85];
    const isSharp = sharps.indexOf(pianoIndex) !== -1;

    let rate = 0;

    if ((pianoIndex >= 0) && (pianoIndex <= 2)) {
        rate = 0.0625;
    } else if ((pianoIndex >= 3) && (pianoIndex <= 14)) {
        rate = 0.125;
    } else if ((pianoIndex >= 15) && (pianoIndex <= 26)) {
        rate = 0.25;
    } else if ((pianoIndex >= 27) && (pianoIndex <= 38)) {
        rate = 0.5;
    } else if ((pianoIndex >= 39) && (pianoIndex <= 50)) {
        rate = 1;
    } else if ((pianoIndex >= 51) && (pianoIndex <= 62)) {
        rate = 2;
    } else if ((pianoIndex >= 63) && (pianoIndex <= 74)) {
        rate = 4;
    } else if ((pianoIndex >= 75) && (pianoIndex <= 86)) {
        rate = 8;
    } else if ((pianoIndex >= 87) && (pianoIndex <= 98)) {
        rate = 16;
    }

    if (isSharp) {
        rate *= Math.pow(2, (1 / 12));
    }

    return rate;
};

const createOneshotSettings = () => {
    const NUMBER_OF_ONESHOTS = 88;

    const settings = new Array(NUMBER_OF_ONESHOTS);

    for (let i = 0; i < NUMBER_OF_ONESHOTS; i++) {
        const setting = {
            buffer : 0,
            rate   : 1,
            loop   : false,
            start  : 0,
            end    : 0,
            volume : 1
        };

        setting.buffer = getBufferIndex(i);
        setting.rate   = calculateRate(i);

        settings[i] = setting;
    }

    return settings;
};

try {
    X('oneshot').setup({
        resources : oneshots,
        settings  : createOneshotSettings(),
        timeout   : 60000,
        success   : () => {
            document.querySelector('x-piano').removeAttribute('loading');
        }
    });
} catch (error) {
    window.alert(error.message);
}
