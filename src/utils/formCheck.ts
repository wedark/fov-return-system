import type { SimpleForm } from '~/types/form';

export function checkIfCompleted(form: SimpleForm) {
  const { actions } = form;

  const usedActions = Object.values(actions).filter((action) => action.used === true);

  if (usedActions.length === 0) return false;

  let completed = true;

  usedActions.forEach((action) => {
    if (!action.completed || !action.performedBy) completed = false;
  });

  return completed;
}
