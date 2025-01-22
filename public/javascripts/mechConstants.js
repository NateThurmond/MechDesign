const isMechInternalStructurePoints = {
    20: { head: 3, centerTorso: 6, sideTorso: 5, arms: 3, legs: 4 },
    25: { head: 3, centerTorso: 7, sideTorso: 6, arms: 4, legs: 5 },
    30: { head: 3, centerTorso: 8, sideTorso: 6, arms: 5, legs: 7 },
    40: { head: 3, centerTorso: 12, sideTorso: 8, arms: 6, legs: 9 },
    45: { head: 3, centerTorso: 13, sideTorso: 9, arms: 7, legs: 10 },
    50: { head: 3, centerTorso: 15, sideTorso: 10, arms: 8, legs: 11 },
    55: { head: 3, centerTorso: 16, sideTorso: 11, arms: 9, legs: 12 },
    60: { head: 3, centerTorso: 18, sideTorso: 12, arms: 10, legs: 13 },
    65: { head: 3, centerTorso: 19, sideTorso: 13, arms: 11, legs: 14 },
    70: { head: 3, centerTorso: 21, sideTorso: 14, arms: 11, legs: 15 },
    75: { head: 3, centerTorso: 23, sideTorso: 15, arms: 12, legs: 16 },
    80: { head: 3, centerTorso: 24, sideTorso: 16, arms: 13, legs: 17 },
    85: { head: 3, centerTorso: 26, sideTorso: 17, arms: 14, legs: 18 },
    90: { head: 3, centerTorso: 27, sideTorso: 18, arms: 15, legs: 19 },
    95: { head: 3, centerTorso: 29, sideTorso: 19, arms: 16, legs: 20 },
    100: { head: 3, centerTorso: 30, sideTorso: 20, arms: 17, legs: 21 },
};

const clanMechInternalStructurePoints = {
    20: { head: 3, centerTorso: 6, sideTorso: 4, arms: 3, legs: 4 },
    25: { head: 3, centerTorso: 8, sideTorso: 5, arms: 4, legs: 5 },
    30: { head: 3, centerTorso: 10, sideTorso: 6, arms: 5, legs: 6 },
    40: { head: 3, centerTorso: 12, sideTorso: 8, arms: 6, legs: 8 },
    45: { head: 3, centerTorso: 14, sideTorso: 9, arms: 7, legs: 9 },
    50: { head: 3, centerTorso: 16, sideTorso: 10, arms: 8, legs: 10 },
    55: { head: 3, centerTorso: 17, sideTorso: 11, arms: 9, legs: 11 },
    60: { head: 3, centerTorso: 19, sideTorso: 12, arms: 10, legs: 12 },
    65: { head: 3, centerTorso: 20, sideTorso: 13, arms: 11, legs: 13 },
    70: { head: 3, centerTorso: 22, sideTorso: 15, arms: 11, legs: 15 },
    75: { head: 3, centerTorso: 24, sideTorso: 16, arms: 12, legs: 16 },
    80: { head: 3, centerTorso: 26, sideTorso: 17, arms: 13, legs: 17 },
    85: { head: 3, centerTorso: 28, sideTorso: 18, arms: 14, legs: 18 },
    90: { head: 3, centerTorso: 30, sideTorso: 19, arms: 15, legs: 19 },
    95: { head: 3, centerTorso: 32, sideTorso: 20, arms: 16, legs: 20 },
    100: { head: 3, centerTorso: 34, sideTorso: 22, arms: 17, legs: 22 },
};

// Approximate num of avail slots per weight class
const mechSlotByWeightClass = {
    Light: {
        mecharm: 4,
        mechhead: 1,
        mechtorso: 4,
        mechtorsocenter: 5,
        mechleg: 2,
    },
    Medium: {
        mecharm: 5,
        mechhead: 1,
        mechtorso: 6,
        mechtorsocenter: 7,
        mechleg: 3,
    },
    Heavy: {
        mecharm: 7,
        mechhead: 1,
        mechtorso: 9,
        mechtorsocenter: 10,
        mechleg: 4,
    },
    Assault: {
        mecharm: 8,
        mechhead: 1,
        mechtorso: 12,
        mechtorsocenter: 12,
        mechleg: 5,
    },
};

const standardEngineWeights = {
    100: 3.0,
    105: 3.5,
    110: 3.5,
    115: 4.0,
    120: 4.0,
    125: 4.0,
    130: 4.5,
    135: 4.5,
    140: 5.0,
    145: 5.0,
    150: 5.5,
    155: 5.5,
    160: 6.0,
    165: 6.0,
    170: 6.5,
    175: 7.0,
    180: 7.0,
    185: 7.5,
    190: 7.5,
    195: 8.0,
    200: 8.5,
    205: 8.5,
    210: 9.0,
    215: 9.5,
    220: 10.0,
    225: 10.0,
    230: 10.5,
    235: 11.0,
    240: 11.5,
    245: 12.0,
    250: 12.5,
    255: 13.0,
    260: 13.5,
    265: 14.0,
    270: 14.5,
    275: 15.5,
    280: 16.0,
    285: 16.5,
    290: 17.5,
    295: 18.0,
    300: 19.0,
    305: 19.5,
    310: 20.5,
    315: 21.5,
    320: 22.5,
    325: 23.5,
    330: 24.5,
    335: 25.5,
    340: 27.0,
    345: 28.5,
    350: 29.5,
    355: 31.5,
    360: 33.0,
    365: 34.5,
    370: 37.0,
    375: 38.5,
    380: 41.0,
    385: 43.5,
    390: 46.0,
    395: 49.0,
    400: 52.5,
};

const xlEngineWeights = {
    100: 1.5,
    105: 2.0,
    110: 2.0,
    115: 2.0,
    120: 2.0,
    125: 2.0,
    130: 2.5,
    135: 2.5,
    140: 2.5,
    145: 2.5,
    150: 3.0,
    155: 3.0,
    160: 3.0,
    165: 3.0,
    170: 3.0,
    175: 3.5,
    180: 3.5,
    185: 4.0,
    190: 4.0,
    195: 4.0,
    200: 4.5,
    205: 4.5,
    210: 4.5,
    215: 5.0,
    220: 5.0,
    225: 5.0,
    230: 5.5,
    235: 5.5,
    240: 6.0,
    245: 6.0,
    250: 6.5,
    255: 6.5,
    260: 7.0,
    265: 7.0,
    270: 7.5,
    275: 8.0,
    280: 8.0,
    285: 8.5,
    290: 9.0,
    295: 9.0,
    300: 9.5,
    305: 10.0,
    310: 10.5,
    315: 11.0,
    320: 11.5,
    325: 12.0,
    330: 12.5,
    335: 13.0,
    340: 13.5,
    345: 14.5,
    350: 15.0,
    355: 16.0,
    360: 16.5,
    365: 17.5,
    370: 18.5,
    375: 19.5,
    380: 20.5,
    385: 22.0,
    390: 23.0,
    395: 24.5,
    400: 26.5,
};

const gyroWeights = {
    100: 1.0,
    105: 2.0,
    110: 2.0,
    115: 2.0,
    120: 2.0,
    125: 2.0,
    130: 2.0,
    135: 2.0,
    140: 2.0,
    145: 2.0,
    150: 2.0,
    155: 2.0,
    160: 2.0,
    165: 2.0,
    170: 2.0,
    175: 2.0,
    180: 2.0,
    185: 2.0,
    190: 2.0,
    195: 2.0,
    200: 2.0,
    205: 3.0,
    210: 3.0,
    215: 3.0,
    220: 3.0,
    225: 3.0,
    230: 3.0,
    235: 3.0,
    240: 3.0,
    245: 3.0,
    250: 3.0,
    255: 3.0,
    260: 3.0,
    265: 3.0,
    270: 3.0,
    275: 3.0,
    280: 3.0,
    285: 3.0,
    290: 3.0,
    295: 3.0,
    300: 3.0,
    305: 4.0,
    310: 4.0,
    315: 4.0,
    320: 4.0,
    325: 4.0,
    330: 4.0,
    335: 4.0,
    340: 4.0,
    345: 4.0,
    350: 4.0,
    355: 4.0,
    360: 4.0,
    365: 4.0,
    370: 4.0,
    375: 4.0,
    380: 4.0,
    385: 4.0,
    390: 4.0,
    395: 4.0,
    400: 4.0,
};
