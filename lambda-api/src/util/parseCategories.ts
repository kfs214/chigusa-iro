// TODO undefined、空配列、空文字等各パターンをテスト

export const parseCategories = (categoriesParam?: string[]) =>
  categoriesParam?.map((categoryStr) => +categoryStr)?.filter((e) => !isNaN(e));
