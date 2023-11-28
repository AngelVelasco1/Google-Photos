import { Request, Response, NextFunction} from 'express'


export const auth = (req: Request, res: Response, next: NextFunction) => {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/views/login')
  }
}