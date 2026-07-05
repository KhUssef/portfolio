export type TraceLine = {
  tag: string;
  text: string;
};

// The hero renders these as a looping blackboard trace: one QuantumBoard run,
// from plain-English goal to verified circuit. Decorative copy, kept here so
// content stays in data files.
export const traceLines: TraceLine[] = [
  { tag: "intake", text: 'goal: "create a bell state on 2 qubits"' },
  { tag: "designer", text: "circuit drafted: 2 qubits, depth 2" },
  { tag: "simulator", text: "4096 shots, distribution measured" },
  { tag: "verifier", text: "TVD 0.008, within tolerance" },
  { tag: "control", text: "accepted: circuit verified" },
];
