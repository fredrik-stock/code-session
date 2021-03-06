export type User = {
  id: number;
  name: string;
  email: string | null;
  roles: string[];
  bossId: number | null;
};
