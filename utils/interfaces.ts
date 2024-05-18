interface iProps {
  task: any[];
  start: any[];
  progress: any[];
  done: any[];
}

export interface iCompany {
  companyName: string;
  personalName: string;
  email: string;
  password: string;
  staff: Array<{}>;
  tasks: Array<{}>;
  programTask: iProps;
  role: string;
}

export interface iStaff {
  personalName: string;
  email: string;
  companyID: string;
  password: string;
  tasks: Array<{}>;
  company: {};
  role: string;
}

export interface iTask {
  title: string;
  stage: string;
  assigned: string;
  staff: {};
  company: {};
}
