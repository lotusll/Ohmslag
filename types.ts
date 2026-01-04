
export interface CircuitState {
  voltage: number;   // U in Volts
  resistance: number; // R in Ohms
  current: number;    // I in Amperes
}

export enum Section {
  Theory = 'Theory',
  Lab = 'Lab',
  Functions = 'Functions',
  Protection = 'Protection',
  Summary = 'Summary'
}
