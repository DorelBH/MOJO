// CostData.js
import React from 'react';

const initialCosts = [
    { label: 'אולם/גן אירועים', cost: '' },
    { label: 'צלם', cost: '' },
    { label: 'צלם מגנטים', cost: '' },
    { label: 'דיג\'יי', cost: '' },
    { label: 'אקו"ם', cost: '' },
    { label: 'תאורה והגברה', cost: '' },
    { label: 'עיצוב אולם', cost: '' },
    { label: 'בר אקטיבי', cost: '' },
    { label: 'הזמנות', cost: '' }
];

const additionalCosts = {
    חינה: [
        { label: 'תלבושת חתן', cost: '' },
        { label: 'תלבושת כלה', cost: '' },
        { label: 'תלבושת נוספות', cost: '' }
    ],
    חתונה: [
        { label: 'שמלת כלה', cost: '' },
        { label: 'איפור כלה', cost: '' },
        { label: 'עיצוב שיער', cost: '' },
        { label: 'חליפת חתן', cost: '' },
        { label: 'טבעות נישואים', cost: '' },
        { label: 'רבנות', cost: '' },
        { label: 'רב לחופה', cost: '' },
        { label: 'זר כלה', cost: '' },
        { label: 'קישוט לרכב', cost: '' },
        { label: 'מלון', cost: '' }
    ],
    ברית: [
        { label: 'מוהל', cost: '' }
    ]
};

const CostData = ({ eventType }) => {
    return [...initialCosts, ...(additionalCosts[eventType] || [])];
};

export default CostData;
