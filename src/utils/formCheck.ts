import type { SimpleForm } from '~/types/form';

export function checkIfCompleted(form: SimpleForm) {
  const { actions } = form;

  const usedActions = Object.values(actions).filter((action) => action.used === true);

  usedActions.forEach((action) => {
    if (!action.completed || !action.performedBy) return false;
  });

  return true;
}
