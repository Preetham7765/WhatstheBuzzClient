import {RATIO, STEP} from "../constants/Config";

const calcLevel = (rep) => {
    let level = 0;
    let step = STEP;
    let progress;
    while (true) {
        progress = rep / step;
        rep -= step;
        if (rep < 0) break;
        step *= RATIO;
        level += 1
    }
    return [level, progress];
};

export {calcLevel};