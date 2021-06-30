import { IPage } from "../interfaces/page";
let result: string[] = [];

export const getParentsId = (
  id: string,
  pages: Map<string, IPage>
): string[] => {
  const page = pages.get(id);

  if (!page || !page.parentId) {
    return result;
  }

  if (page && page.parentId) {
    result.push(page.parentId);
    getParentsId(page.parentId, pages);
  }

  return result;
};
