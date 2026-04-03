type File = {
  id: string;
  type: 'file';
  name: string;
  contents?: string;
};

type Directory = {
  id: string;
  type: 'directory';
  name: string;
  children: Node[];
};

export type Node = File | Directory;
