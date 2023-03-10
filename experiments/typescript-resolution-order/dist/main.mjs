// It resolves to ".ts".
import A from './A.js';
// It resolves to ".mts".
import B from './B.mjs';
// It resolves to ".cts".
import C from './C.cjs';
// It resolves to ".tsx", even explictly declaring ".jsx" extension.
import D from './D.js';
// It resolves to ".tsx", because ".ts" isn't available.
import E from './E.jsx';
// It resolves to ".js", because ".ts" and ".tsx" aren't available.
import F from './F.js';
// It resolves to ".js", even explictly declaring ".jsx" extension.
import G from './G.js';
export { A, B, C, D, E, F, G };
