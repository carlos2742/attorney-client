export interface Article {
  id: number;
  title: string;
  content: string;
  image_id: string;
  permalinks: any;
  practice_area: any;
  tags: Array<any>;
  updated_at: string;
}

export interface Comment {
  id: number;
  name: string;
  email: string;
  content: string;
}
