import { IPage } from "../interfaces/page";
const parentIds: string[] = [];

export const getParentsId = (
  id: string,
  pages: Map<string, IPage>
): string[] => {
  const page = pages.get(id);

  if (page && page.parentId) {
    return [page.parentId, ...getParentsId(page.parentId, pages)];
  }

  return parentIds;
};
