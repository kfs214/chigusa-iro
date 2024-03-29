export type WPErrorDetail = {
  code?: string;
  message?: string;
  data: string | null;
};

export type WPErrorData = {
  status?: number;
  params?: {
    [key: string]: string | undefined;
    after?: string;
    before?: string;
  };
  details?: {
    [key: string]: WPErrorDetail | undefined;
  };
};

export type WPError = {
  code: string;
  message?: string;
  data?: WPErrorData;
};

export type WPPost = {
  link: string;
  title: { rendered: string };
  excerpt: { rendered: string };
};

export type Post = {
  link: string;
  title: string;
  excerpt: string;
};
