export interface IPage {
  id: string;
  title: string;
  url: string;
  level: number;
  tabIndex: number;
  disqus_id: string;
  parentId?: string;
  pages?: string[];
  anchors?: string[];
}
