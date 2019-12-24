import express from 'express'
import { getSomeParentPageById, addNewPage,updatePage } from '../controller/pages';

const parentPages = express.Router()

parentPages.get('/:id',getSomeParentPageById)
parentPages.post('/',addNewPage)
parentPages.put('/',updatePage)

export default parentPages