const KEY = 'badia-alhorouf-state-v3';
const defaults = { version: 3, mode: 'two', activePlayer: 0, profiles: [{id:'fawaz',name:'فواز',money:80},{id:'ziyad',name:'زياد',money:80}], buildings: [] };
export function normalizeMode(m) { return ['f','z','two'].includes(m) ? m : 'two'; }
export function createGameStore() {
  let state = structuredClone(defaults);
  return {
    load() { try { const raw = localStorage.getItem(KEY); if (raw) state = {...state,...JSON.parse(raw)}; } catch(e) {} state.mode=normalizeMode(state.mode); return structuredClone(state); },
    save(p={}) { state={...state,...p,version:3}; try { localStorage.setItem(KEY,JSON.stringify(state)); } catch(e) {} return structuredClone(state); },
    setMode(m) { state.mode=normalizeMode(m); return state.mode; },
    get() { return structuredClone(state); }
  };
}