import { NextFunction, Response, Request } from 'express';
import { ValidationError } from 'yup';
import axios, { AxiosError } from 'axios';
import {
  getAllBugs as BugsService, createBug, updateBug, addBugToGithub,
} from '../services';
import { addBugSchema, updateBugSchema } from '../helpers/validation';
import { templateErrors } from '../helpers';
import { Bug } from '../models';
import config from '../config';

const getAllBugs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status, priority, assignedTo } = req.body;
    const bugs = await BugsService({ status, priority, assignedTo });
    res.json({
      message: 'success',
      data: bugs,
    });
  } catch (error) {
    next(error);
  }
};
const createNewBug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { title, description, priority } = req.body;
    await addBugSchema.validate({ title, description, priority });
    const bug = await createBug({ title, description, priority });
    res.json({
      message: 'success',
      data: bug,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};

const editBug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {
      id, priority, status, assignedTo,
    } = req.body;
    await updateBugSchema.validate({
      id, priority, status, assignedTo,
    });
    const bug = await updateBug(id, { priority, status, assignedTo });
    res.json({
      message: 'success',
      data: bug,
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    return next(error);
  }
};

const createIssue = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, assignedTo } = req.body;
    // eslint-disable-next-line no-restricted-globals
    if (isNaN(id)) throw templateErrors.BAD_REQUEST('id must be a number');
    const bug = await addBugToGithub(id, assignedTo);
    res.json({
      message: 'success',
      data: bug,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};

const deleteBug = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;

    // eslint-disable-next-line no-restricted-globals
    if (isNaN(Number(id))) {
      throw templateErrors.BAD_REQUEST('id must be a number');
    }
    const bug = await Bug.destroy({
      where: {
        id,
      },
    });

    res.json({
      message: 'success',
      data: bug,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};

const getContributors = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const requestOption = {
      headers: {
        Authorization: `Bearer ${config.GITHUB_TOKEN}`,
      },
    };

    const { data } = await axios.get(
      'https://api.github.com/repos/YasserAmro0/SW_FrontEnd_Group2/contributors',
      requestOption,
    );
    const contributors = data.map((contributor:{ login:string; }) => contributor.login);
    res.json({
      message: 'success',
      data: contributors,
    });
  } catch (error) {
    if (error instanceof AxiosError) {
      return next(templateErrors.BAD_REQUEST(error.message));
    }
    next(error);
  }
};
export {
  getAllBugs, createNewBug, editBug, createIssue, deleteBug, getContributors,
};
