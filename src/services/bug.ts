import axios from 'axios';
import config from '../config';
import { Bug } from '../models';
import { IGetAllBugs, Bug as BugType } from '../types';
import { templateErrors } from '../helpers';

const getAllBugs = async ({ status, priority, assignedTo }:IGetAllBugs) => {
  const whereCondition = {
    status,
    priority,
    assignedTo,
  };
  if (!status) delete whereCondition.status;
  if (!priority) delete whereCondition.priority;
  if (!assignedTo) delete whereCondition.assignedTo;
  const bugs = await Bug.findAll({
    where: whereCondition,
  });
  return bugs;
};

const createBug = async ({ title, description, priority }:BugType) => {
  const createdBug = await Bug.create(
    {
      title,
      description,
      priority,
    },
  );
  return createdBug;
};

const updateBug = async (id:number, {
  priority, status, assignedTo,
}:IGetAllBugs) => {
  const updatedBug = await Bug.findByPk(id);
  if (!updatedBug) throw new Error('Bug not found');
  updatedBug.priority = priority || updatedBug.priority;
  updatedBug.status = status || updatedBug.status;
  updatedBug.assignedTo = assignedTo || updatedBug.assignedTo;
  await updatedBug.save();
  return updatedBug;
};

const addBugToGithub = async (id:number, assignedTo:string) => {
  const bug = await Bug.findByPk(id);
  const requestOption = {
    headers: {
      Authorization: `Bearer ${config.GITHUB_TOKEN}`,
    },
  };

  const { data } = await axios.get(
    'https://api.github.com/repos/GSG-G13/ntherapy-express/contributors',
    requestOption,
  );
  if (assignedTo !== 'unassigned') {
    const isContributor = data.some((contributor:{
      login:string; }) => contributor.login === assignedTo);
    if (!isContributor) throw templateErrors.BAD_REQUEST('You are not a contributor to this repo and you can not create an issue for this repo');
  }
  if (!bug) throw templateErrors.NOT_FOUND('Bug not found');
  await axios.post(
    'https://api.github.com/repos/GSG-G13/ntherapy-express/issues',
    {
      title: bug.title,
      body: bug.description,
      labels: ['bug'],
      assignees: [assignedTo === 'unassigned' ? '' : assignedTo],
    },
    requestOption,
  );
  return bug;
};

export {
  getAllBugs,
  createBug,
  updateBug,
  addBugToGithub,
};
