export interface CategoryInterface {
  id: number;
  background_color: string;
  text_color: string;
  title: string;
}

export interface SelectedCategoryInterface {
  id: number;
  background_color: string;
  text_color: string;
  label: string;
  value: string;
}

export interface BlogTemplateInterface {
  author: string;
  categories: CategoryInterface[];
  description: string;
  id: number;
  image: string;
  publish_date: string;
  title: string;
}
