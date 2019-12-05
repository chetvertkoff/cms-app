import express from 'express'
import { getSomeParentPageById, addNewPage } from '../controller/pages';

const parentPages = express.Router()

parentPages.get('/:id',getSomeParentPageById)
parentPages.post('/',addNewPage)


export default parentPages