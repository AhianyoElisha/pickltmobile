import React, { createContext, useContext, useReducer, useMemo } from 'react';

// ── Action types ──────────────────────────────────────────────────────────────

type WizardAction<TState> =
  | { type: 'SET_FIELD'; key: keyof TState; value: TState[keyof TState] }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'RESET'; initialState: WizardState<TState> };

// ── State shape ───────────────────────────────────────────────────────────────

export interface WizardState<TState> {
  activeStep: number;
  formData: TState;
}

// ── Reducer factory ───────────────────────────────────────────────────────────

function createWizardReducer<TState>(totalSteps: number) {
  return function wizardReducer(
    state: WizardState<TState>,
    action: WizardAction<TState>,
  ): WizardState<TState> {
    switch (action.type) {
      case 'SET_FIELD':
        return {
          ...state,
          formData: { ...state.formData, [action.key]: action.value },
        };
      case 'NEXT_STEP':
        return {
          ...state,
          activeStep: Math.min(state.activeStep + 1, totalSteps),
        };
      case 'PREV_STEP':
        return {
          ...state,
          activeStep: Math.max(state.activeStep - 1, 1),
        };
      case 'GO_TO_STEP':
        return {
          ...state,
          activeStep: Math.max(1, Math.min(action.step, totalSteps)),
        };
      case 'RESET':
        return action.initialState;
      default:
        return state;
    }
  };
}

// ── Context ───────────────────────────────────────────────────────────────────

interface WizardContextValue<TState> {
  state: WizardState<TState>;
  dispatch: React.Dispatch<WizardAction<TState>>;
  setField: <K extends keyof TState>(key: K, value: TState[K]) => void;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
}

// We use `any` for the context default — consumers always access via the typed hook.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const WizardContext = createContext<WizardContextValue<any> | null>(null);

// ── Provider ──────────────────────────────────────────────────────────────────

interface WizardProviderProps<TState> {
  initialState: TState;
  totalSteps: number;
  children: React.ReactNode;
}

export function WizardProvider<TState>({
  initialState,
  totalSteps,
  children,
}: WizardProviderProps<TState>) {
  const reducer = useMemo(() => createWizardReducer<TState>(totalSteps), [totalSteps]);

  const [state, dispatch] = useReducer(reducer, {
    activeStep: 1,
    formData: initialState,
  });

  const value = useMemo<WizardContextValue<TState>>(() => ({
    state,
    dispatch,
    setField: (key, val) => dispatch({ type: 'SET_FIELD', key, value: val }),
    nextStep: () => dispatch({ type: 'NEXT_STEP' }),
    prevStep: () => dispatch({ type: 'PREV_STEP' }),
    goToStep: (step) => dispatch({ type: 'GO_TO_STEP', step }),
  }), [state, dispatch]);

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

// ── Hook ──────────────────────────────────────────────────────────────────────

export function useWizard<TState>(): WizardContextValue<TState> {
  const ctx = useContext(WizardContext);
  if (!ctx) throw new Error('useWizard must be used inside <WizardProvider>');
  return ctx as WizardContextValue<TState>;
}
