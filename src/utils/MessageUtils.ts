const logCannotFindContextError = (componentName: string) => {
  throw new Error('Tooltip.* 컴포넌트는 Tooltip 내에서만 사용해야 합니다.');
};
